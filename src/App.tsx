import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Label } from "./components/Label";

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

        <form className="flex flex-col gap-4">
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="title">Título</Label>

                <Input id="title" {...form.register(`links.${index}.title`)} />
              </div>

              <div className="flex-1 flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="url">URL</Label>

                  <Input id="url" {...form.register(`links.${index}.url`)} />
                </div>

                <Button
                  type="button"
                  onClick={() => links.remove(index)}
                  variant="destructive"
                  tabIndex={-1}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </div>
          ))}

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
        </form>
      </div>
    </div>
  );
}
