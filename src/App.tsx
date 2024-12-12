import { Reorder } from "framer-motion";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button } from "./components/Button";
import { LinkItem } from "./components/LinkItem";

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: "Link 01", url: "https://app.jstack.com.br" },
        { title: "Link 02", url: "https://instagram.com.br" },
      ],
    },
  });

  const initialValue = { title: "", url: "https://" };

  const links = useFieldArray({ control: form.control, name: "links" });

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null);

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

  function handleDragStart(index: number) {
    setDraggingIndex(index);
  }

  function handleDragEnd() {
    setDraggingIndex(null);
  }

  function handleReorder(newOrder: typeof links.fields) {
    if (draggingIndex === null) return;

    const draggingLink = links.fields[draggingIndex];

    newOrder.forEach((link, index) => {
      if (link === draggingLink) {
        links.move(draggingIndex, index);
        setDraggingIndex(index);
      }
    });
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight mb-10">Links</h1>

        <Button
          type="button"
          onClick={() => links.prepend(initialValue)}
          className="w-full border-dashed mb-6"
          variant="outline"
        >
          <PlusCircleIcon className="size-4 mr-1" />
          Adicionar no topo da lista
        </Button>

        <FormProvider {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Reorder.Group
              axis="y"
              values={links.fields}
              onReorder={handleReorder}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem
                  key={link.id}
                  index={index}
                  link={link}
                  onDragEnd={handleDragEnd}
                  onDragStart={() => handleDragStart(index)}
                  isDraggingActive={
                    draggingIndex !== null && draggingIndex === index
                  }
                  onRemove={() => links.remove(index)}
                />
              ))}
            </Reorder.Group>

            <Button
              type="button"
              onClick={() => links.append(initialValue)}
              className="w-full border-dashed mt-6"
              variant="outline"
            >
              <PlusCircleIcon className="size-4 mr-1" />
              Adicionar novo link
            </Button>

            <div className="flex gap-4">
              <Button
                onClick={() => links.insert(1, initialValue)}
                type="button"
                className="flex-1"
                variant="secondary"
              >
                Insert
              </Button>

              <Button
                onClick={() => links.move(1, 0)}
                type="button"
                className="flex-1"
                variant="secondary"
              >
                Move
              </Button>

              <Button
                onClick={() => links.replace([initialValue])}
                type="button"
                className="flex-1"
                variant="secondary"
              >
                Replace
              </Button>

              <Button
                onClick={() => links.swap(0, 1)}
                type="button"
                className="flex-1"
                variant="secondary"
              >
                Swap
              </Button>

              <Button
                onClick={() => {
                  //links.update(1, { title: "Updated title", url: "Updated Url" })
                  form.setValue("links.1.title", "Updated title");
                  form.setValue("links.1.url", "Updated URL");
                }}
                type="button"
                className="flex-1"
                variant="secondary"
              >
                Update
              </Button>
            </div>

            <Button type="submit">Enviar</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
