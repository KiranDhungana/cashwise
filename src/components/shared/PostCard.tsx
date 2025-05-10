"use client";

import React from "react";
import { Card, Group, Avatar, Text, Title, Badge, ActionIcon } from "@mantine/core";
import { IconCalendarTime, IconHeart, IconThumbUp, IconShare } from "@tabler/icons-react";

// Updated Post type matching API response
export interface Post {
  id: number;
  uid: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PostCardProps {
  post: Post;
  authorName: string;
  authorAvatar: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, authorName, authorAvatar }) => {
  // Format creation date
  const formattedDate = new Date(post.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      {/* Header */}
      <Group position="apart" mb={4} align="center">
        <Group spacing="xs">
          <Avatar src={authorAvatar} radius="xl" size="sm" />
          <div>
            <Text weight={500} size="sm">
              {authorName}
            </Text>
            <Group spacing={4} align="center">
              <IconCalendarTime size={12} />
              <Text size="xs" color="dimmed">
                {formattedDate}
              </Text>
            </Group>
          </div>
        </Group>
        <Badge variant="outline" size="xs">
          Post
        </Badge>
      </Group>

      {/* Content */}
      <Title order={6} mb={4} lineClamp={2}>
        {post.title}
      </Title>
      <Text size="sm" color="dimmed" lineClamp={3} mb={8}>
        {post.description}
      </Text>

      {/* Actions */}
      <Group spacing="xs" position="left">
        <ActionIcon size="sm" variant="light">
          <IconHeart size={16} />
        </ActionIcon>
        <ActionIcon size="sm" variant="light">
          <IconThumbUp size={16} />
        </ActionIcon>
        <ActionIcon size="sm" variant="light">
          <IconShare size={16} />
        </ActionIcon>
      </Group>
    </Card>
  );
};
