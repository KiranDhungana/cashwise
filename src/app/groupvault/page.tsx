"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Card,
  Group,
  Text,
  Title,
  Progress,
  Button,
  Tabs,
  Badge,
  Avatar,
  Grid,
  Paper,
  TagsInput,
  OptionsFilter,
  ComboboxItem,
} from "@mantine/core";
import Modalcomponent from "@/components/shared/Modelcomponent";
import Goalcard from "@/components/shared/Goalcard";
import { Input } from "@/components/shared/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiClient from "@/services/apiClient";
import { showToast } from "@/utils/toster";

// Event form values and API event type
type EventForm = {
  title: string;
  description: string;
  totalAmount: string;
  perPerson: string;
  dueDate: string;
};
interface EventType {
  id: string;
  title: string;
  description: string;
  totalAmount: number;
  collectedAmount: number;
  perPerson: number;
  dueDate: string;
}

// Validation schema
const eventSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  totalAmount: Yup.number().typeError("Must be a number").required("Total amount is required"),
  perPerson: Yup.number().typeError("Must be a number").required("Per-person amount is required"),
  dueDate: Yup.string().required("Due date is required"),
}).required();

const Modalcontent = ({ refreshEvents }: { refreshEvents: () => void }) => {
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EventForm>({
    resolver: yupResolver(eventSchema),
    defaultValues: { title: "", description: "", totalAmount: "", perPerson: "", dueDate: "" },
  });

  const onSubmit: SubmitHandler<EventForm> = async (data) => {
    setFormError(null);
    try {
      await apiClient.post("/api/auth/user/add/event", {
        title: data.title,
        description: data.description,
        totalAmount: parseFloat(data.totalAmount),
        perPerson: parseFloat(data.perPerson),
        dueDate: data.dueDate,
      });
      showToast({ message: "Event created" });
      refreshEvents(); // automatically refresh list
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || "Failed to create event";
      setFormError(msg);
      showToast({ message: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="title" label="Title" control={control} />
      <Input name="description" label="Description" control={control} />
      <Input name="totalAmount" label="Total Amount" control={control} />
      <Input name="perPerson" label="Per Person" control={control} />
      <Input name="dueDate" label="Due Date" type="date" control={control} />

      {formError && (
        <Text color="red" size="sm" mt="sm">
          {formError}
        </Text>
      )}

      <Button type="submit" fullWidth loading={isSubmitting} mt="md">
        Add Event
      </Button>
    </form>
  );
};

const Groupvault = () => {
  const [activeTab, setActiveTab] = useState("my-events");
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userOptions, setUserOptions] = useState<ComboboxItem[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Fetch events callback
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get<EventType[]>("/api/auth/user/get/event");
      setEventList(res.data);
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message;
      showToast({ message: msg });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchEvents();
    apiClient
      .get<{ id: string; name: string }[]>("/api/auth/get/users")
      .then((res) => setUserOptions(res.data.map((u) => ({ value: u.id, label: u.name }))))
      .catch(() => showToast({ message: "Couldn’t load invite list." }));
  }, [fetchEvents]);

  if (loading) return <Text>Loading your events…</Text>;

  return (
    <Container size="lg" className="py-8">
      {eventList.length === 0 ? (
        <>
          <Text>No events yet—create one!</Text>
          <Modalcomponent
            title="Create Event"
            label="+ Create Event"
            childern={<Modalcontent refreshEvents={fetchEvents} />}
          />
        </>
      ) : (
        <>
          <Card shadow="sm" padding="lg" className="mb-6">
            <Group position="apart">
              <Text weight={500}>Your Event Wallet</Text>
              <Title order={3} className="text-green-600">
                ${eventList.reduce((sum, ev) => sum + ev.collectedAmount, 0)}
              </Title>
            </Group>
          </Card>

          <Tabs value={activeTab} className="mb-4">
            <Tabs.List>
              <Tabs.Tab value="my-events">My Events</Tabs.Tab>
              <Tabs.Tab value="joined-groups">Joined Groups</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Modalcomponent
            title="Create Event"
            label="+ Create Event"
            childern={<Modalcontent refreshEvents={fetchEvents} />}
          />

          {eventList.map((ev) => {
            const pct = ((ev.collectedAmount / ev.totalAmount) * 100).toFixed(1);
            const due = new Date(ev.dueDate);
            const daysLeft = Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            const formattedDue = due.toLocaleDateString("en-GB");
            const members = [
              { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg", status: "Signed", contributed: ev.perPerson },
              {
                name: "Michael Chen",
                avatar: "/avatars/michael.jpg",
                status: "Signed",
                contributed: Math.round(ev.perPerson * 0.8),
              },
              {
                name: "David Garcia",
                avatar: "/avatars/david.jpg",
                status: "Pending",
                contributed: Math.round(ev.perPerson * 0.4),
              },
              {
                name: "Lisa Taylor",
                avatar: "/avatars/lisa.jpg",
                status: "Pending",
                contributed: Math.round(ev.perPerson * 0.3),
              },
            ];
            const optionsFilter: OptionsFilter = ({ options, search }) => {
              const filtered = (options as ComboboxItem[]).filter((option) =>
                option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
              );

              filtered.sort((a, b) => a.label.localeCompare(b.label));
              return filtered;
            };
            return (
              <Card key={ev.id} shadow="sm" padding="lg" className="mb-6">
                <Group className="mb-2">
                  <Group>
                    <Avatar src="/avatars/event.png" size="lg" radius="xl" />
                    <div>
                      <Text w={500}>{ev.title}</Text>
                      <Text size="sm" color="dimmed">
                        {ev.description}
                      </Text>
                    </div>
                  </Group>
                  <Text size="sm" color="dimmed">
                    {pct}%
                  </Text>
                </Group>
                <div className="flex flex-row justify-between">
                  <Group position="apart" className="mb-6">
                    <div>
                      <Text>${ev.collectedAmount} collected</Text>
                      <Text size="sm" color="dimmed">
                        of ${ev.totalAmount}
                      </Text>
                    </div>
                    <div>
                      <Text>Your contribution:</Text>
                      <Text className="text-green-600">
                        ${ev.perPerson} / ${ev.perPerson}
                      </Text>
                    </div>
                    <Avatar.Group>
                      {members.slice(0, 3).map((m) => (
                        <Avatar key={m.name} src={m.avatar} radius="xl" />
                      ))}
                      {members.length > 3 && <Avatar radius="xl">+{members.length - 3}</Avatar>}
                    </Avatar.Group>
                  </Group>
                  <TagsInput
                    label="Invite Team Member"
                    placeholder="Search or type a name"
                    data={userOptions}
                    value={selectedUsers} // controlled selections
                    onChange={setSelectedUsers} // update when tags change
                    filter={optionsFilter} // your existing filter fn
                  />
                </div>

                <Grid className="mb-6">
                  <Grid.Col span={4}>
                    <Paper p="md" shadow="xs">
                      <Text size="sm" color="dimmed">
                        Per Person
                      </Text>
                      <Title order={4}>${ev.perPerson.toFixed(2)}</Title>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Paper p="md" shadow="xs">
                      <Text size="sm" color="dimmed">
                        Due Date
                      </Text>
                      <Title order={4}>{formattedDue}</Title>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Paper p="md" shadow="xs">
                      <Text size="sm" color="dimmed">
                        Days Left
                      </Text>
                      <Title order={4}>{daysLeft}</Title>
                    </Paper>
                  </Grid.Col>
                </Grid>

                {/* joined-people placeholder */}
                {members.map((m) => (
                  <Group key={m.name} className="mb-4 px-4 py-3 bg-white shadow rounded" position="apart">
                    <Group>
                      <Avatar src={m.avatar} radius="xl" size="md" />
                      <div>
                        <Text weight={500}>{m.name}</Text>
                        <Badge
                          variant="filled"
                          className={
                            m.status === "Signed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {m.status}
                        </Badge>
                      </div>
                    </Group>
                    <Text
                      weight={500}
                      className={m.contributed === ev.perPerson ? "text-green-600" : "text-orange-500"}
                    >
                      ${m.contributed}/{ev.perPerson}
                    </Text>
                  </Group>
                ))}
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default Groupvault;
