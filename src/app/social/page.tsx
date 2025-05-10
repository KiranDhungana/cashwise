"use client";

import React, { useState, useEffect } from "react";
import { Button, Tabs, TextInput, Container, SimpleGrid, Group, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { PostCard } from "@/components/shared/PostCard";
import Modalcomponent from "@/components/shared/Modelcomponent";
import { Input } from "@/components/shared/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "@/services/apiClient";
import { showToast } from "@/utils/toster";

// Define the Post type to match your PostCard props
interface Post {
  id: string;
  name: string;
  avatar: string;
  date: string;
  content: string;
  bgColor?: string;
  reactions?: { avatar: string }[];
  extraReactions?: number;
}

// Form values for creating a post
type PostFormValues = {
  title: string;
  description: string;
};

// Validation schema
const postSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Content is required"),
}).required();

// Modal content component
const ModalPostContent = ({ refreshPosts }: { refreshPosts: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostFormValues>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      await apiClient.post("/api/auth/add/post", data);
      showToast({ message: "Post created" });
      refreshPosts();
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || "Failed to create post";
      showToast({ message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="title" label="Title" control={control} />
      <Input name="description" label="Content" control={control} />
      <Button type="submit" fullWidth loading={isSubmitting} mt="md">
        Add Post
      </Button>
    </form>
  );
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<Post[]>("api/auth/get/posts");
      setPosts(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container my="lg" className="max-w-xl">
      <Group position="apart" mb="md">
        <Tabs defaultValue="feed">
          <Tabs.List>
            <Tabs.Tab value="feed">Feed</Tabs.Tab>
            <Tabs.Tab value="friends">Friends</Tabs.Tab>
            <Tabs.Tab value="groups">Groups</Tabs.Tab>
            <Tabs.Tab value="badges">Badges</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {/* Add Post button with modal */}
        <Modalcomponent
          title="Add New Post"
          label="Add Post"
          childern={<ModalPostContent refreshPosts={fetchPosts} />}
        />
      </Group>

      <TextInput placeholder="Search..." mb="md" icon={<IconSearch size={16} />} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <SimpleGrid cols={1} spacing="md">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} authorName="Sarah Johnson" authorAvatar="/avatars/sarah.jpg" />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
