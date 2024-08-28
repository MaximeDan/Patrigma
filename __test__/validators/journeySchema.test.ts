import {
  detailsStepSchema,
  introductionStepSchema,
  journeyFormSchema,
  stepsOverviewStepSchema,
} from "@/validators/journeyFormSchema";

describe("introductionStepSchema", () => {
  it("should pass with valid title and description", () => {
    const data = { title: "A valid title", description: "A valid description" };
    expect(() => introductionStepSchema.parse(data)).not.toThrow();
  });

  it("should fail when title is empty", () => {
    const data = { title: "", description: "A valid description" };
    expect(() => introductionStepSchema.parse(data)).toThrow(
      "Ce champ est requis",
    );
  });

  it("should fail when description is empty", () => {
    const data = { title: "A valid title", description: "" };
    expect(() => introductionStepSchema.parse(data)).toThrow(
      "Ce champ est requis",
    );
  });

  it("should fail when both title and description are empty", () => {
    const data = { title: "", description: "" };
    expect(() => introductionStepSchema.parse(data)).toThrow(
      "Ce champ est requis",
    );
  });
});

describe("detailsStepSchema", () => {
  it("should pass with valid data", () => {
    const data = {
      requirement: "Some requirement",
      physicalDifficulty: "1",
      cluesDifficulty: "2",
      mobilityImpaired: "accessible",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
    };
    expect(() => detailsStepSchema.parse(data)).not.toThrow();
  });

  it("should fail when requirement is empty", () => {
    const data = {
      requirement: "",
      physicalDifficulty: "1",
      cluesDifficulty: "2",
      mobilityImpaired: "accessible",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
    };
    expect(() => detailsStepSchema.parse(data)).toThrow("Ce champ est requis");
  });

  it("should fail when physicalDifficulty is missing", () => {
    const data = {
      requirement: "Some requirement",
      cluesDifficulty: "2",
      mobilityImpaired: "accessible",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
    };
    expect(() => detailsStepSchema.parse(data)).toThrow(
      "Vous devez sélectionner une option",
    );
  });

  it("should fail when mobilityImpaired has an invalid value", () => {
    const data = {
      requirement: "Some requirement",
      physicalDifficulty: "1",
      cluesDifficulty: "2",
      mobilityImpaired: "invalidValue",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
    };
    expect(() => detailsStepSchema.parse(data)).toThrow(
      "Vous devez sélectionner une option",
    );
  });
});

describe("stepsOverviewStepSchema", () => {
  it("should pass with at least two steps", () => {
    const data = {
      steps: JSON.stringify({ steps: ["step1", "step2"] }),
    };
    expect(() => stepsOverviewStepSchema.parse(data)).not.toThrow();
  });

  it("should fail when steps is empty", () => {
    const data = {
      steps: JSON.stringify({ steps: [] }),
    };
    expect(() => stepsOverviewStepSchema.parse(data)).toThrow(
      "Vous devez ajouter au moins deux étapes",
    );
  });

  it("should fail when steps contains only one step", () => {
    const data = {
      steps: JSON.stringify({ steps: ["step1"] }),
    };
    expect(() => stepsOverviewStepSchema.parse(data)).toThrow(
      "Vous devez ajouter au moins deux étapes",
    );
  });

  it("should fail when steps is not a valid JSON", () => {
    const data = {
      steps: "invalid JSON",
    };
    expect(() => stepsOverviewStepSchema.parse(data)).toThrow(
      "Vous devez ajouter au moins deux étapes",
    );
  });
});

describe("journeyFormSchema", () => {
  it("should pass with valid data for all steps", () => {
    const data = {
      title: "Journey Title",
      description: "Journey Description",
      requirement: "Some requirement",
      physicalDifficulty: "1",
      cluesDifficulty: "2",
      mobilityImpaired: "accessible",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
      steps: JSON.stringify({ steps: ["step1", "step2"] }),
      treasure: "A hidden treasure",
    };
    expect(() => journeyFormSchema.parse(data)).not.toThrow();
  });

  it("should fail when any field is invalid", () => {
    const data = {
      title: "",
      description: "Journey Description",
      requirement: "Some requirement",
      physicalDifficulty: "1",
      cluesDifficulty: "2",
      mobilityImpaired: "accessible",
      partiallySighted: "unaccessible",
      partiallyDeaf: "partiallyAccessible",
      cognitivelyImpaired: "undefined",
      steps: JSON.stringify({ steps: ["step1", "step2"] }),
      treasure: "A hidden treasure",
    };
    expect(() => journeyFormSchema.parse(data)).toThrow("Ce champ est requis");
  });
});
