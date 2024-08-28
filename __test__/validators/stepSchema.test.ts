import {
  addStepSchema,
  addStepArraySchema,
  addStepAPISchema,
} from "@/validators/stepFormSchema";

describe("addStepSchema", () => {
  it("should pass with valid puzzle, answer, hint, and coordinates", () => {
    const data = {
      puzzle: "Solve this puzzle",
      answer: "Answer",
      hint: "Hint",
      coordinates: "123,456",
    };
    expect(() => addStepSchema.parse(data)).not.toThrow();
  });

  it("should fail when puzzle is empty", () => {
    const data = {
      puzzle: "",
      answer: "Answer",
      hint: "Hint",
      coordinates: "123,456",
    };
    expect(() => addStepSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when answer is empty", () => {
    const data = {
      puzzle: "Solve this puzzle",
      answer: "",
      hint: "Hint",
      coordinates: "123,456",
    };
    expect(() => addStepSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when hint is empty", () => {
    const data = {
      puzzle: "Solve this puzzle",
      answer: "Answer",
      hint: "",
      coordinates: "123,456",
    };
    expect(() => addStepSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when coordinates are empty", () => {
    const data = {
      puzzle: "Solve this puzzle",
      answer: "Answer",
      hint: "Hint",
      coordinates: "",
    };
    expect(() => addStepSchema.parse(data)).toThrow("Ce champ est requis");
  });
});

describe("addStepArraySchema", () => {
  it("should pass with valid puzzle, answer, hint, and coordinates", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "Hint",
        coordinates: {
          latitude: 45.0,
          longitude: 90.0,
        },
      },
    ];
    expect(() => addStepArraySchema.parse(data)).not.toThrow();
  });

  it("should fail when puzzle is empty", () => {
    const data = [
      {
        puzzle: "",
        answer: "Answer",
        hint: "Hint",
        coordinates: {
          latitude: 45.0,
          longitude: 90.0,
        },
      },
    ];
    expect(() => addStepArraySchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when coordinates are invalid", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "Hint",
        coordinates: {
          latitude: 100.0, // Invalid latitude
          longitude: 90.0,
        },
      },
    ];

    try {
      addStepArraySchema.parse(data);
    } catch (error) {
      const zodError = error as z.ZodError;
      const latitudeError = zodError.issues.find((issue) =>
        issue.path.includes("latitude"),
      );
      expect(latitudeError).toBeDefined();
    }
  });

  it("should fail when any required field is missing", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "",
        coordinates: {
          latitude: 45.0,
          longitude: 90.0,
        },
      },
    ];
    expect(() => addStepArraySchema.parse(data)).toThrow("Ce champ est requis");
  });
});

describe("addStepAPISchema", () => {
  it("should pass with valid puzzle, answer, hint, latitude, and longitude", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "Hint",
        latitude: 45.0,
        longitude: 90.0,
      },
    ];
    expect(() => addStepAPISchema.parse(data)).not.toThrow();
  });

  it("should fail when latitude is out of range", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "Hint",
        latitude: 100.0, // Invalid latitude
        longitude: 90.0,
      },
    ];
    expect(() => addStepAPISchema.parse(data)).toThrow(
      "La latitude doit être entre -90 et 90",
    );
  });

  it("should fail when longitude is out of range", () => {
    const data = [
      {
        puzzle: "Solve this puzzle",
        answer: "Answer",
        hint: "Hint",
        latitude: 45.0,
        longitude: 200.0, // Invalid longitude
      },
    ];
    expect(() => addStepAPISchema.parse(data)).toThrow(
      "La longitude doit être entre -180 et 180",
    );
  });

  it("should fail when any required field is missing", () => {
    const data = [
      {
        puzzle: "",
        answer: "Answer",
        hint: "Hint",
        latitude: 45.0,
        longitude: 90.0,
      },
    ];
    expect(() => addStepAPISchema.parse(data)).toThrow("Ce champ est requis");
  });
});
