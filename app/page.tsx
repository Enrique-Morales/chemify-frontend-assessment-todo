"use client";
import {
  Button,
  Container,
  Text,
  Title,
  Modal,
  TextInput,
  Group,
  Card,
  ActionIcon,
} from "@mantine/core";
import { useState, useRef, useEffect, Ref } from "react";
import { Trash } from "tabler-icons-react";

import { MantineProvider, ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Task } from "@/model/types";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "./constants";

export default () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const taskTitle = useRef("");

  const createTask = async () => {
    const newTask = {
      // @ts-ignore
      title: taskTitle.current.value,
    };
    await saveTask(newTask);
    loadTasks();
  };

  const saveTask = async (task: Task) => {
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(task),
    });
  };

  const deleteTask = async (task: Task) => {
    const { id } = task;
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    loadTasks();
  };

  const loadTasks = async () => {
    const data = await fetch(`${API_URL}/todos`);
    const tasks = await data.json();

    if (tasks.data) {
      setTasks(tasks.data);
    }
  };

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <MantineProvider
      theme={{ colorScheme: colorScheme as ColorScheme, defaultRadius: "md" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        <Modal
          opened={opened}
          size={"md"}
          title={"New Task"}
          withCloseButton={false}
          onClose={() => {
            setOpened(false);
          }}
          centered
        >
          <TextInput
            mt={"md"}
            ref={taskTitle as unknown as Ref<HTMLInputElement>}
            placeholder={"Task Title"}
            required
            label={"Title"}
          />
          <Group mt={"md"} position={"apart"}>
            <Button
              onClick={() => {
                setOpened(false);
              }}
              variant={"subtle"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                createTask();
                setOpened(false);
              }}
            >
              Create Task
            </Button>
          </Group>
        </Modal>
        <Container size={550} my={40}>
          <Group position={"apart"}>
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              My Tasks
            </Title>
          </Group>
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              if (task.title) {
                return (
                  <Card withBorder key={index} mt={"sm"}>
                    <Group position={"apart"}>
                      <Text weight={"bold"}>{task.title}</Text>
                      <ActionIcon
                        onClick={() => {
                          deleteTask(task);
                        }}
                        color={"red"}
                        variant={"transparent"}
                      >
                        <Trash />
                      </ActionIcon>
                    </Group>
                  </Card>
                );
              }
            })
          ) : (
            <Text size={"lg"} mt={"md"} color={"dimmed"}>
              You have no tasks
            </Text>
          )}
          <Button
            onClick={() => {
              setOpened(true);
            }}
            fullWidth
            mt={"md"}
          >
            New Task
          </Button>
        </Container>
      </div>
    </MantineProvider>
  );
};
