import { memo } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/AlertDialog";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton";

import { useDeleteProduct } from "../services/deleteProduc";

export const DeleteProduct = memo(
  ({
    id,
    open,
    onClose,
  }: {
    id?: string;
    open: boolean;
    onClose: () => void;
  }) => {
    const { mutateAsync, isPending } = useDeleteProduct();

    const onSubmit = async () => {
      if (!id) {
        return;
      }
      try {
        await mutateAsync(id);
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <LoadingButton
              isLoading={isPending}
              variant="error"
              onClick={onSubmit}
              disabled={isPending}
            >
              Continue
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);
