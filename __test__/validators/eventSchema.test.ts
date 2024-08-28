import { eventFormSchema } from "./path/to/eventFormSchema"; // Assurez-vous de remplacer par le chemin correct

describe("eventFormSchema", () => {
  it("should pass when all fields are valid", () => {
    const validData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail when title is missing", () => {
    const invalidData = {
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["title"]);
    expect(result.error?.issues[0].message).toBe("Ce champ est requis");
  });

  it("should fail when description is missing", () => {
    const invalidData = {
      title: "Valid Event",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["description"]);
    expect(result.error?.issues[0].message).toBe("Ce champ est requis");
  });

  it("should fail when numberPlayerMin is less than 1", () => {
    const invalidData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 0,
      numberPlayerMax: 5,
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["numberPlayerMin"]);
    expect(result.error?.issues[0].message).toBe(
      "Le nombre de joueur minimum doit être supérieur à 0",
    );
  });

  it("should fail when numberPlayerMax is less than 1", () => {
    const invalidData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 0,
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["numberPlayerMax"]);
    expect(result.error?.issues[0].message).toBe(
      "Le nombre de joueur maximum doit être supérieur à 0",
    );
  });

  it("should fail when numberPlayerMax is less than numberPlayerMin", () => {
    const invalidData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 5,
      numberPlayerMax: 4, // This should fail
      isPrivate: false,
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["numberPlayerMax"],
          message:
            "Le nombre de joueur maximum doit être supérieur ou égal au nombre de joueur minimum",
        }),
        expect.objectContaining({
          path: ["numberPlayerMin"],
          message:
            "Le nombre de joueur minimum doit être inférieur ou égal au nombre de joueur maximum",
        }),
      ]),
    );
  });

  it("should fail when the event is private but accessCode is missing", () => {
    const invalidData = {
      title: "Private Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: true, // Private event
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
      // Missing accessCode
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["accessCode"]);
    expect(result.error?.issues[0].message).toBe(
      "Un code d'accès est requis pour une partie privée",
    );
  });

  it("should pass when the event is private and accessCode is provided", () => {
    const validData = {
      title: "Private Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: true, // Private event
      accessCode: "secret-code", // Provided accessCode
      startAt: new Date(),
      endAt: new Date(Date.now() + 3600 * 1000),
    };

    const result = eventFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail if startAt is missing", () => {
    const invalidData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: false,
      endAt: new Date(Date.now() + 3600 * 1000), // Missing startAt
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["startAt"]);
    expect(result.error?.issues[0].message).toBe(
      "Veuillez renseigner une date de début",
    );
  });

  it("should fail if endAt is missing", () => {
    const invalidData = {
      title: "Valid Event",
      description: "This is a valid event description.",
      numberPlayerMin: 2,
      numberPlayerMax: 5,
      isPrivate: false,
      startAt: new Date(), // Missing endAt
    };

    const result = eventFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["endAt"]);
    expect(result.error?.issues[0].message).toBe(
      "Veuillez renseigner une date de fin",
    );
  });
});
