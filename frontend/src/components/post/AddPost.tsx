'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link as LinkIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';
import { isValidUrl } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import appAxios from '@/lib/axios.config';
import { Post_URL } from '@/lib/apiEndPoints';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions';

const AddPost = () => {
  const { data } = useSession();
  const userSession = data as CustomSession;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postState, setPostState] = useState<PostStateType>({
    url: '',
    image_url: '',
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({
    title: [],
    url: [],
    description: [],
  });

  const loadPreview = async () => {
    if (postState?.url && isValidUrl(postState.url!)) {
      setLoading(true);
      axios
        .post('/api/image-preview', { url: postState.url })
        .then((res) => {
          setLoading(false);
          const response: ImagePreviewResType = res.data?.data;
          const urlImage =
            response.images.length > 0
              ? response.images[0]
              : 'https://images.unsplash.com/photo-1716847214575-4e5a41cdd3da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D';

          setPostState({
            ...postState,
            image_url: urlImage,
            title: response.title,
            description: response.description ?? '',
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error('Something went wrong while fetching data from url!');
        });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(postState);

    setLoading(true);

    appAxios
      .post(Post_URL, postState, {
        headers: {
          Authorization: `Bearer ${userSession?.user?.token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);
        setOpen(false);
        toast.success('Post added successfully');
      })
      .catch((err) => {
        setLoading(false);

        setErrors(err.response?.data?.errors);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <div
          className="flex space-x-3 items-center mb-4"
          onClick={() => setOpen(true)}
        >
          <LinkIcon className="w-5 h-5" />
          <p>Submit Article</p>
        </div>
      </DialogTrigger>
      <DialogContent
        className="overflow-y-scroll max-h-screen"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {postState.image_url && (
            <Image
              src={postState.image_url}
              width={500}
              height={450}
              alt="article preview"
              className="object-contain w-full rounded-xl my-2"
            />
          )}

          <div className="mb-4">
            <Label htmlFor="url">Url</Label>
            <Input
              type="text"
              id="url"
              placeholder="Paste your url here.."
              value={postState.url}
              onChange={(e) =>
                setPostState({ ...postState, url: e.target.value })
              }
              onBlur={() => loadPreview()}
            />
            <span className="text-red-500">{errors.url?.[0]}</span>
          </div>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Type here.."
              value={postState.title}
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
            <span className="text-red-500">{errors.title?.[0]}</span>
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={10}
              placeholder="Type here..."
              value={postState.description}
              onChange={(e) =>
                setPostState({ ...postState, description: e.target.value })
              }
            />
            <span className="text-red-500">{errors.description?.[0]}</span>
          </div>
          <Button disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
