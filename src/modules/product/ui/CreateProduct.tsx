import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/_form/Form";
import { NumberField } from "@/components/_rhf/Number";
import { SelectField } from "@/components/_rhf/Select";
import { TextField } from "@/components/_rhf/Text";
import { TextAreaField } from "@/components/_rhf/TextArea";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { LoadingButton } from "@/components/LoadingButton";

import {
  CreateProductSchema,
  createProductSchema,
} from "../schemas/createProductSchema";
import { useCreateProduct } from "../services/createProduct";

interface CreateProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateProductComponent: FC<CreateProductProps> = ({ open, setOpen }) => {
  const { mutateAsync, isPending } = useCreateProduct();

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
    },
  });

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      await mutateAsync(data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Form {...form}>
            <div className="space-y-4">
              <TextField name="name" label="Name" />
              <TextAreaField name="description" label="Description" />
              <SelectField
                name="category"
                label="Category"
                placeholder="Select Category"
                data={Array.from({ length: 10 }, (_, i) => ({
                  value: `Category ${i + 1}`,
                  label: `Category ${i + 1}`,
                }))}
              />
              <NumberField name="price" label="Price" />
            </div>
          </Form>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            isLoading={isPending}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Save
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const CreateProduct = memo(CreateProductComponent);
