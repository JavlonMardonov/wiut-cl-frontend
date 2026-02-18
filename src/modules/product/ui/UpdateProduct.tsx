import { zodResolver } from "@hookform/resolvers/zod";
import { FC, memo, useEffect } from "react";
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
  updateProductSchema,
  type UpdateProductSchema,
} from "../schemas/updateProductSchema";
import { useUpdateProduct } from "../services/updateProduct";
import { Product } from "../types/Product";

interface UpdateProductProps {
  open: boolean;
  onClose: () => void;
  id?: string;
  product: Product | null;
}

const mapProductToFormValues = (product: Product): UpdateProductSchema => ({
  name: product.name,
  category: product.category,
  price: product.price,
  description: product.description,
});

const UpdateProductComponent: FC<UpdateProductProps> = ({
  open,
  onClose,
  id,
  product,
}) => {
  const { mutateAsync, isPending } = useUpdateProduct();

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product
      ? mapProductToFormValues(product)
      : {
          name: "",
          category: "",
          price: 0,
          description: "",
        },
  });

  useEffect(() => {
    if (product) {
      form.reset(mapProductToFormValues(product));
    }
  }, [product]);

  const onSubmit = async (data: UpdateProductSchema) => {
    if (!id) {
      return;
    }
    try {
      await mutateAsync({ id, product: data });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
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

export const UpdateProduct = memo(UpdateProductComponent);
