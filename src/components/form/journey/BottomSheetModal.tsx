// components/BottomSheetModal.tsx
"use client";
import { useJourneyFormStore } from "@/store/journeyFormStore";
import { Button } from "@/components/ui/button";
import { addStepSchema } from "@/validators/stepFormSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet } from "react-modal-sheet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import LeafletMap from "@/components/map/LeafletMap";
import { Plus } from "lucide-react";

type AddStepFormValues = z.infer<typeof addStepSchema>;

const BottomSheetModal = () => {
  const {
    bottomSheetVisible,
    hideBottomSheet,
    addStep,
    editedStep,
    editStep,
    setEditedStep,
  } = useJourneyFormStore();
  const [dragDisabled, setDragDisabled] = useState(false);

  useEffect(() => {
    if (editedStep) {
      form.setValue("puzzle", editedStep.puzzle);
      form.setValue("answer", editedStep.answer);
      form.setValue("hint", editedStep.hint);
      form.setValue(
        "coordinates",
        `${editedStep.coordinates.latitude};${editedStep.coordinates.longitude}`,
      );
    }
  }, [editedStep]);

  const form = useForm<AddStepFormValues>({
    resolver: zodResolver(addStepSchema),
    defaultValues: {
      puzzle: "",
      answer: "",
      hint: "",
      coordinates: "",
    },
  });

  const processForm: SubmitHandler<AddStepFormValues> = (data) => {
    const coordinates = data.coordinates.split(";");
    const latitude = parseFloat(coordinates[0]);
    const longitude = parseFloat(coordinates[1]);

    if (editedStep) {
      editStep(
        {
          hint: data.hint,
          puzzle: data.puzzle,
          answer: data.answer,
          coordinates: {
            latitude,
            longitude,
          },
        },
        editedStep.index,
      );
    } else {
      addStep({
        answer: data.answer,
        coordinates: {
          latitude,
          longitude,
        },
        hint: data.hint,
        puzzle: data.puzzle,
      });
    }

    hideBottomSheet();
    onDismiss();
  };

  const onDismiss = () => {
    hideBottomSheet();
    setEditedStep(null);
    form.reset();
  };

  const updateCoordinates = (latitude: number, longitude: number) => {
    form.setValue("coordinates", `${latitude};${longitude}`);
  };

  return (
    <Sheet
      isOpen={bottomSheetVisible}
      onClose={onDismiss}
      disableDrag={dragDisabled}
    >
      <Sheet.Container className="p-2">
        <Sheet.Header className="bg-red" />
        <Sheet.Content className="px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processForm)}>
              <div className="flex">
                <FormField
                  control={form.control}
                  name="puzzle"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="puzzle">Question*</Label>
                          <Input {...field} id="puzzle" />
                        </>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/* TO DO: add file input field for picturePuzzle registration */}
              </div>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="answer">Réponse*</Label>
                        <Input {...field} id="answer" />
                      </>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex">
                <FormField
                  control={form.control}
                  name="hint"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Label htmlFor="hint">Indice*</Label>
                          <Input {...field} id="hint" />
                        </>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {/* TO DO: add file input field for pictureHint registration */}
              </div>
              <FormField
                control={form.control}
                name="coordinates"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <>
                        <Label htmlFor="coordinates">Emplacement*</Label>
                        <Input
                          {...field}
                          id="coordinates"
                          hidden
                          type=""
                          aria-hidden
                          className="hidden"
                        />
                      </>
                    </FormControl>
                    <div className="relative">
                      <div className="absolute">{/* search bar */}</div>
                      <LeafletMap
                        setDragDisabled={setDragDisabled}
                        form={form}
                        updateCoordinates={updateCoordinates}
                      />
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex  justify-end">
                <Button className="mt-2 border-orange bg-orange p-2 text-white shadow-xl hover:bg-orange">
                  <span>
                    {editedStep ? "Modifier l'étape" : "Ajouter l'étape"}
                  </span>
                  <Plus size={24} stroke="#f0f0f0" />
                </Button>
              </div>
            </form>
          </Form>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default BottomSheetModal;
