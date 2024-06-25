import { Journey, Event, PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminRole: Role = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "ADMIN",
      description: "ADMIN role",
    },
  });

  const userRole: Role = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "USER",
      description: "USER role",
    },
  });

  const alice: User = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      name: "Alice",
      lastName: "Prisma",
      email: "alice@prisma.io",
      username: "aliceUserName",
      password: "alicePassword",
      dateOfBirth: new Date("1990-01-01"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
          {
            role: {
              connect: {
                id: adminRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const bob: User = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      name: "Bob",
      lastName: "Doe",
      email: "bob@prisma.io",
      username: "bobUserName",
      password: "bobPassword",
      dateOfBirth: new Date("1999-01-01"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const charlie: User = await prisma.user.upsert({
    where: { email: "charlie@prisma.io" },
    update: {},
    create: {
      name: "Charlie",
      lastName: "Smith",
      email: "charlie@prisma.io",
      username: "charlieUserName",
      password: "charliePassword",
      dateOfBirth: new Date("1985-05-05"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const david: User = await prisma.user.upsert({
    where: { email: "david@prisma.io" },
    update: {},
    create: {
      name: "David",
      lastName: "Johnson",
      email: "david@prisma.io",
      username: "davidUserName",
      password: "davidPassword",
      dateOfBirth: new Date("1995-07-15"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const emma: User = await prisma.user.upsert({
    where: { email: "emma@prisma.io" },
    update: {},
    create: {
      name: "Emma",
      lastName: "Brown",
      email: "emma@prisma.io",
      username: "emmaUserName",
      password: "emmaPassword",
      dateOfBirth: new Date("1992-09-20"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const frank: User = await prisma.user.upsert({
    where: { email: "frank@prisma.io" },
    update: {},
    create: {
      name: "Frank",
      lastName: "Wilson",
      email: "frank@prisma.io",
      username: "frankUserName",
      password: "frankPassword",
      dateOfBirth: new Date("1988-03-10"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const grace: User = await prisma.user.upsert({
    where: { email: "grace@prisma.io" },
    update: {},
    create: {
      name: "Grace",
      lastName: "Miller",
      email: "grace@prisma.io",
      username: "graceUserName",
      password: "gracePassword",
      dateOfBirth: new Date("1991-11-25"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const henry: User = await prisma.user.upsert({
    where: { email: "henry@prisma.io" },
    update: {},
    create: {
      name: "Henry",
      lastName: "Taylor",
      email: "henry@prisma.io",
      username: "henryUserName",
      password: "henryPassword",
      dateOfBirth: new Date("1994-12-05"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const isabella: User = await prisma.user.upsert({
    where: { email: "isabella@prisma.io" },
    update: {},
    create: {
      name: "Isabella",
      lastName: "Anderson",
      email: "isabella@prisma.io",
      username: "isabellaUserName",
      password: "isabellaPassword",
      dateOfBirth: new Date("1993-06-30"),
      avatar: "https://picsum.photos/seed/picsum/200/300",
      userRoles: {
        create: [
          {
            role: {
              connect: {
                id: userRole.id,
              },
            },
          },
        ],
      },
    },
  });

  const journey1: Journey = await prisma.journey.upsert({
    where: { id: 1 },
    update: {},
    create: {
      authorId: alice.id,
      title: "Treasure Hunt in Old Paris",
      description:
        "Discover the historical heritage of Paris by solving puzzles and following clues to find the hidden treasure.",
      requirement: "No specific skills required. Suitable for all ages.",
      treasure: "A chest filled with gold coins and historical souvenirs.",
      estimatedDistance: 5,
      estimatedDuration: 2,
      cluesDifficulty: 2,
      physicalDifficulty: 1,
      lastCompletion: new Date("2021-01-01"),
      mobilityImpaired: "Partially accessible",
      partiallySighted: "Partially accessible",
      partiallyDeaf: "Partially accessible",
      cognitivelyImpaired: "Partially accessible",
      steps: {
        create: [
          {
            puzzle:
              "Which famous tower in Paris is known for its iron structure?",
            answer: "Eiffel Tower",
            hint: "It was built by Gustave Eiffel for the 1889 Universal Exposition.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8584,
            longitude: 2.2945,
            address: "Champ de Mars, 5 Avenue Anatole France",
            city: "Paris",
            postalCode: "75007",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Which famous museum houses the Mona Lisa?",
            answer: "Louvre Museum",
            hint: "It is located in the Louvre Palace, the former residence of the French kings.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8606,
            longitude: 2.3376,
            address: "Rue de Rivoli",
            city: "Paris",
            postalCode: "75001",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle:
              "In which district of Paris is the Notre-Dame Cathedral located?",
            answer: "Île de la Cité",
            hint: "It is located on an island in the middle of the Seine River.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.853,
            longitude: 2.3499,
            address: "6 Parvis Notre-Dame - Pl. Jean-Paul II",
            city: "Paris",
            postalCode: "75004",
            country: "France",
            stepNumber: 3,
          },
          {
            puzzle:
              "Which famous cabaret is known for its dance and music shows?",
            answer: "Moulin Rouge",
            hint: "It is located in the Pigalle district, known for its lively nightlife.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8842,
            longitude: 2.3323,
            address: "82 Boulevard de Clichy",
            city: "Paris",
            postalCode: "75018",
            country: "France",
            stepNumber: 4,
          },
          {
            puzzle:
              "Which famous monument commemorates the French soldiers who died in World War I?",
            answer: "Arc de Triomphe",
            hint: "It is located at the end of the Champs-Élysées avenue.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8738,
            longitude: 2.295,
            address: "Place Charles de Gaulle",
            city: "Paris",
            postalCode: "75008",
            country: "France",
            stepNumber: 5,
          },
          {
            puzzle:
              "Which famous cathedral is located on the highest point in Paris?",
            answer: "Sacré-Cœur Basilica",
            hint: "It offers a panoramic view of the city from its dome.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8867,
            longitude: 2.3431,
            address: "35 Rue du Chevalier de la Barre",
            city: "Paris",
            postalCode: "75018",
            country: "France",
            stepNumber: 6,
          },
          {
            puzzle:
              "Which famous avenue in Paris is known for its luxury shops and theaters?",
            answer: "Champs-Élysées",
            hint: "It is often called 'the most beautiful avenue in the world'.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8698,
            longitude: 2.3078,
            address: "Avenue des Champs-Élysées",
            city: "Paris",
            postalCode: "75008",
            country: "France",
            stepNumber: 7,
          },
          {
            puzzle:
              "Which famous opera house in Paris is known for its grand architecture?",
            answer: "Palais Garnier",
            hint: "It was designed by Charles Garnier and opened in 1875.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8719,
            longitude: 2.3314,
            address: "Place de l'Opéra",
            city: "Paris",
            postalCode: "75009",
            country: "France",
            stepNumber: 8,
          },
        ],
      },
    },
  });

  const journey2: Journey = await prisma.journey.upsert({
    where: { id: 2 },
    update: {},
    create: {
      authorId: alice.id,
      title: "Treasure Hunt in the Latin Quarter",
      description:
        "Explore the Latin Quarter in Paris by solving puzzles and following clues to find the hidden treasure.",
      requirement: "No specific skills required. Suitable for all ages.",
      treasure: "A chest filled with gold coins and cultural souvenirs.",
      estimatedDistance: 2,
      estimatedDuration: 1,
      cluesDifficulty: 2,
      physicalDifficulty: 1,
      lastCompletion: new Date("2021-02-01"),
      mobilityImpaired: "Partially accessible",
      partiallySighted: "Partially accessible",
      partiallyDeaf: "Partially accessible",
      cognitivelyImpaired: "Partially accessible",
      steps: {
        create: [
          {
            puzzle: "Which famous university is located in the Latin Quarter?",
            answer: "Sorbonne",
            hint: "It was founded in 1257 and is one of the oldest universities in the world.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8462,
            longitude: 2.3444,
            address: "1 Rue Victor Cousin",
            city: "Paris",
            postalCode: "75005",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Which famous monument is located near the Sorbonne?",
            answer: "Pantheon",
            hint: "It was built in 1790 and houses the tombs of famous personalities.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 48.8466,
            longitude: 2.3469,
            address: "Place du Pantheon",
            city: "Paris",
            postalCode: "75005",
            country: "France",
            stepNumber: 2,
          },
        ],
      },
    },
  });

  const journey3: Journey = await prisma.journey.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: alice.id,
      title: "Treasure Hunt through the Heritage of Rouen",
      description:
        "Embark on a discovery of Rouen's historic and cultural heritage by solving puzzles and following clues to find the hidden treasure.",
      requirement: "No specific skills required. Suitable for all ages.",
      treasure: "A chest filled with gold coins and historical souvenirs.",
      estimatedDistance: 5,
      estimatedDuration: 2.5,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-03-01"),
      mobilityImpaired: "Partially accessible",
      partiallySighted: "Partially accessible",
      partiallyDeaf: "Partially accessible",
      cognitivelyImpaired: "Partially accessible",
      steps: {
        create: [
          {
            puzzle:
              "Which famous monument is located on the Place du Vieux-Marché?",
            answer: "Saint Joan of Arc Church",
            hint: "This church is dedicated to Joan of Arc and is located on the site where she was burned at the stake.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4421,
            longitude: 1.0939,
            address: "Place du Vieux-Marché",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle:
              "Which famous museum is located on the left bank of the Seine?",
            answer: "Museum of Fine Arts of Rouen",
            hint: "This museum houses an important collection of artworks from the Middle Ages to the 21st century.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4427,
            longitude: 1.0931,
            address: "Esplanade Marcel Duchamp",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle: "Which famous monument is located on the Cathedral Square?",
            answer: "Rouen Cathedral",
            hint: "This cathedral is one of the largest Gothic structures in Europe and has inspired many artists, including Claude Monet.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.44,
            longitude: 1.0949,
            address: "Place de la Cathédrale",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 3,
          },
          {
            puzzle: "Which famous square is located near the Rouen Cathedral?",
            answer: "Place du Général de Gaulle",
            hint: "This square is named after the former French president and is a popular meeting place in Rouen.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4407,
            longitude: 1.0937,
            address: "Place du Général de Gaulle",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 4,
          },
          {
            puzzle: "Which famous clock is located in the Gros-Horloge street?",
            answer: "Gros-Horloge",
            hint: "This astronomical clock is one of the main attractions in Rouen and dates back to the 14th century.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4402,
            longitude: 1.0941,
            address: "Rue du Gros-Horloge",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 5,
          },
          {
            puzzle: "Which famous square is located near the Gros-Horloge?",
            answer: "Place de la Pucelle",
            hint: "This square is named after Joan of Arc, also known as the Maid of Orleans.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4404,
            longitude: 1.0934,
            address: "Place de la Pucelle",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 6,
          },
          {
            puzzle:
              "Which famous street is known for its half-timbered houses?",
            answer: "Rue du Gros-Horloge",
            hint: "This street is one of the most picturesque in Rouen and is lined with beautiful half-timbered houses.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4402,
            longitude: 1.0941,
            address: "Rue du Gros-Horloge",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 7,
          },
          {
            puzzle:
              "Which famous square is located near the Rue du Gros-Horloge?",
            answer: "Place de la Calende",
            hint: "This square is a lively area in Rouen with many shops, cafes, and restaurants.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 49.4409,
            longitude: 1.0936,
            address: "Place de la Calende",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 8,
          },
        ],
      },
    },
  });

  const journey4: Journey = await prisma.journey.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: alice.id,
      title: "Treasure Hunt in Old Nice",
      description:
        "Discover the historical heritage of Nice by solving puzzles and following clues to find the hidden treasure.",
      requirement: "No particular skills required. Suitable for all ages.",
      treasure: "A chest filled with gold coins and historical souvenirs.",
      estimatedDistance: 4,
      estimatedDuration: 2,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-04-01"),
      mobilityImpaired: "Partially accessible",
      partiallySighted: "Partially accessible",
      partiallyDeaf: "Partially accessible",
      cognitivelyImpaired: "Partially accessible",
      steps: {
        create: [
          {
            puzzle:
              "Which famous monument is located on the Promenade des Anglais?",
            answer: "Hôtel Negresco",
            hint: "This iconic hotel is a symbol of the city of Nice.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.6957,
            longitude: 7.2706,
            address: "37 Promenade des Anglais",
            city: "Nice",
            postalCode: "06000",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle:
              "Which famous park is located at the top of the Castle Hill?",
            answer: "Parc de la Colline du Château",
            hint: "This park offers a panoramic view of the city of Nice.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.6965,
            longitude: 7.2827,
            address: "Montée du Château",
            city: "Nice",
            postalCode: "06300",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle: "Which famous museum is located on Place Garibaldi?",
            answer: "Musée d'Art Moderne et d'Art Contemporain",
            hint: "This museum houses a collection of modern and contemporary art.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.7037,
            longitude: 7.2794,
            address: "Place Yves Klein",
            city: "Nice",
            postalCode: "06300",
            country: "France",
            stepNumber: 3,
          },
          {
            puzzle: "Which famous market is located on Place Masséna?",
            answer: "Marché aux Fleurs",
            hint: "This colorful market offers a wide variety of flowers and plants.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.6972,
            longitude: 7.2706,
            address: "Place Masséna",
            city: "Nice",
            postalCode: "06000",
            country: "France",
            stepNumber: 4,
          },
        ],
      },
    },
  });

  const journey5: Journey = await prisma.journey.upsert({
    where: { id: 5 },
    update: {},
    create: {
      authorId: alice.id,
      title: "Treasure Hunt through the Heritage of Toulouse",
      description:
        "Embark on a journey to discover the historical and cultural heritage of Toulouse by solving puzzles and following clues to find the hidden treasure.",
      requirement: "No particular skills required. Suitable for all ages.",
      treasure: "A chest filled with gold coins and historical souvenirs.",
      estimatedDistance: 5,
      estimatedDuration: 2.5,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-05-01"),
      mobilityImpaired: "Partially accessible",
      partiallySighted: "Partially accessible",
      partiallyDeaf: "Partially accessible",
      cognitivelyImpaired: "Partially accessible",
      steps: {
        create: [
          {
            puzzle: "Which famous monument is located on Place du Capitole?",
            answer: "Capitole de Toulouse",
            hint: "The Capitole is the city hall of Toulouse and also houses the Théâtre du Capitole.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.6045,
            longitude: 1.444,
            address: "Place du Capitole",
            city: "Toulouse",
            postalCode: "31000",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Which famous museum is located on Allées Jules Guesde?",
            answer: "Musée des Augustins",
            hint: "The Musée des Augustins is an art museum located in a former Augustinian convent.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.5992,
            longitude: 1.4436,
            address: "21 Rue de Metz",
            city: "Toulouse",
            postalCode: "31000",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle: "Which famous monument is located on Place Saint-Sernin?",
            answer: "Basilique Saint-Sernin",
            hint: "The Basilique Saint-Sernin is a Romanesque church and an important pilgrimage site.",
            picturePuzzle: "https://picsum.photos/seed/picsum/200/300",
            pictureHint: "https://picsum.photos/seed/picsum/200/300",
            latitude: 43.611,
            longitude: 1.4489,
            address: "Place Saint-Sernin",
            city: "Toulouse",
            postalCode: "31000",
            country: "France",
            stepNumber: 3,
          },
        ],
      },
    },
  });

  const event1: Event = await prisma.event.upsert({
    where: { id: 1 },
    update: {},
    create: {
      authorId: alice.id,
      journeyId: journey1.id,
      title: "Amazing Race",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Join us for an exciting race filled with challenges and puzzles!",
      accessCode: "1234",
      startAt: new Date("2024-05-01"),
      endAt: new Date("2024-05-01"),
    },
  });

  const event2: Event = await prisma.event.upsert({
    where: { id: 2 },
    update: {},
    create: {
      authorId: bob.id,
      journeyId: journey1.id,
      title: "Escape Room Adventure",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 5,
      numberPlayerMin: 1,
      description: "Can you solve the puzzles and escape the room in time?",
      accessCode: "5678",
      startAt: new Date("2024-06-01"),
      endAt: new Date("2024-06-01"),
    },
  });

  const event3: Event = await prisma.event.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: bob.id,
      journeyId: journey2.id,
      title: "Treasure Hunt",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Embark on a thrilling treasure hunt and uncover hidden secrets!",
      accessCode: "abcd",
      startAt: new Date("2024-07-01"),
      endAt: new Date("2024-07-01"),
    },
  });

  const event4: Event = await prisma.event.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: charlie.id,
      journeyId: journey2.id,
      title: "Mystery Mansion",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 12,
      numberPlayerMin: 3,
      description:
        "Explore the haunted mansion and solve the mystery that lies within!",
      accessCode: "efgh",
      startAt: new Date("2024-08-01"),
      endAt: new Date("2024-08-01"),
    },
  });

  const event5: Event = await prisma.event.upsert({
    where: { id: 5 },
    update: {},
    create: {
      authorId: david.id,
      journeyId: journey2.id,
      title: "Puzzle Challenge",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Test your puzzle-solving skills in this challenging adventure!",
      accessCode: "ijkl",
      startAt: new Date("2024-09-01"),
      endAt: new Date("2024-09-01"),
    },
  });

  const event6: Event = await prisma.event.upsert({
    where: { id: 6 },
    update: {},
    create: {
      authorId: emma.id,
      journeyId: journey3.id,
      title: "Outdoor Expedition",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Embark on an exciting outdoor expedition and conquer nature's challenges!",
      accessCode: "mnop",
      startAt: new Date("2024-10-01"),
      endAt: new Date("2024-10-01"),
    },
  });

  const event7: Event = await prisma.event.upsert({
    where: { id: 7 },
    update: {},
    create: {
      authorId: frank.id,
      journeyId: journey3.id,
      title: "City Scavenger Hunt",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Explore the city and solve clues to complete the ultimate scavenger hunt!",
      accessCode: "qrst",
      startAt: new Date("2024-11-01"),
      endAt: new Date("2024-11-01"),
    },
  });

  const event8: Event = await prisma.event.upsert({
    where: { id: 8 },
    update: {},
    create: {
      authorId: frank.id,
      journeyId: journey3.id,
      title: "Team Building Challenge",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 4,
      numberPlayerMin: 1,
      description:
        "Enhance teamwork and communication skills in this thrilling team building challenge!",
      accessCode: "uvwx",
      startAt: new Date("2024-12-01"),
      endAt: new Date("2024-12-01"),
    },
  });

  const event9: Event = await prisma.event.upsert({
    where: { id: 9 },
    update: {},
    create: {
      authorId: henry.id,
      journeyId: journey4.id,
      title: "Outdoor Escape",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Escape the ordinary and immerse yourself in an unforgettable outdoor adventure!",
      accessCode: "yzab",
      startAt: new Date("2024-05-01"),
      endAt: new Date("2024-05-01"),
    },
  });

  const event10: Event = await prisma.event.upsert({
    where: { id: 10 },
    update: {},
    create: {
      authorId: henry.id,
      journeyId: journey4.id,
      title: "Mysterious Island",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Unravel the secrets of a mysterious island in this thrilling adventure!",
      accessCode: "cdef",
      startAt: new Date("2024-06-01"),
      endAt: new Date("2024-06-01"),
    },
  });

  const event11: Event = await prisma.event.upsert({
    where: { id: 11 },
    update: {},
    create: {
      authorId: emma.id,
      journeyId: journey4.id,
      title: "Enchanted Forest",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 12,
      numberPlayerMin: 3,
      description:
        "Step into the enchanted forest and embark on a magical journey like no other!",
      accessCode: "ghij",
      startAt: new Date("2024-07-01"),
      endAt: new Date("2024-07-01"),
    },
  });

  const event12: Event = await prisma.event.upsert({
    where: { id: 12 },
    update: {},
    create: {
      authorId: charlie.id,
      journeyId: journey5.id,
      title: "Epic Quest",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Embark on an epic quest filled with challenges, puzzles, and adventure!",
      accessCode: "klmn",
      startAt: new Date("2024-08-01"),
      endAt: new Date("2024-08-01"),
    },
  });

  const event13: Event = await prisma.event.upsert({
    where: { id: 13 },
    update: {},
    create: {
      authorId: bob.id,
      journeyId: journey5.id,
      title: "Mystic Temple",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Enter the mystic temple and solve ancient riddles to unlock its secrets!",
      accessCode: "opqr",
      startAt: new Date("2024-09-01"),
      endAt: new Date("2024-09-01"),
    },
  });

  const event14: Event = await prisma.event.upsert({
    where: { id: 14 },
    update: {},
    create: {
      authorId: david.id,
      journeyId: journey5.id,
      title: "Virtual Reality Adventure",
      image: "https://picsum.photos/seed/picsum/200/300",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Immerse yourself in a thrilling virtual reality adventure like never before!",
      accessCode: "stuv",
      startAt: new Date("2024-10-01"),
      endAt: new Date("2024-10-01"),
    },
  });

  const users = [
    alice,
    bob,
    charlie,
    david,
    emma,
    frank,
    grace,
    henry,
    isabella,
  ];
  const events: Event[] = [
    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
    event12,
    event13,
    event14,
  ];

  for (let i = 0; i < users.length; i++) {
    const userEvents: number[] = []; // Array to store the event IDs the user is already registered for

    // Generate a random number of events for the user between 0 and 6
    let numEvents = Math.floor(Math.random() * 7);

    // Ensure that Bob, Henry, and Grace are registered for at least one event because we create EventUserStep for these users
    if (
      users[i].id === bob.id ||
      users[i].id === henry.id ||
      users[i].id === grace.id
    )
      numEvents++;

    for (let j = 0; j < numEvents; j++) {
      let randomEventIndex = Math.floor(Math.random() * events.length);

      // Check if the user is already registered for the randomly selected event
      while (userEvents.includes(events[randomEventIndex].id)) {
        randomEventIndex = Math.floor(Math.random() * events.length);
      }

      // Register the user for the event and add the event ID to the userEvents array
      await prisma.userEvent.upsert({
        where: { id: i * numEvents + j + 1 },
        update: {},
        create: {
          userId: users[i].id,
          eventId: events[randomEventIndex].id,
        },
      });
      userEvents.push(events[randomEventIndex].id);
    }
  }

  await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      authorId: bob.id,
      content: "Great experience! Loved every moment of it.",
      rating: 4,
      journeyId: journey1.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: charlie.id,
      content: "Highly recommended! The challenges were engaging and fun.",
      rating: 5,
      journeyId: journey1.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: david.id,
      content: "Amazing race! Can't wait to participate again.",
      rating: 4,
      journeyId: journey1.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 5 },
    update: {},
    create: {
      authorId: alice.id,
      content:
        "The treasure hunt was so much fun! We found the hidden treasure!",
      rating: 5,
      journeyId: journey2.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 6 },
    update: {},
    create: {
      authorId: grace.id,
      content: "The puzzles were challenging but rewarding. Highly recommend!",
      rating: 4,
      journeyId: journey2.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 7 },
    update: {},
    create: {
      authorId: emma.id,
      content:
        "The treasure hunt was a great team-building activity. Thumbs up!",
      rating: 5,
      journeyId: journey2.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 8 },
    update: {},
    create: {
      authorId: david.id,
      content:
        "The outdoor expedition was an amazing adventure! Loved every moment.",
      rating: 5,
      journeyId: journey3.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 9 },
    update: {},
    create: {
      authorId: frank.id,
      content:
        "The city scavenger hunt was so much fun! We explored hidden gems in the city.",
      rating: 4,
      journeyId: journey3.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 10 },
    update: {},
    create: {
      authorId: charlie.id,
      content:
        "The team building challenge was a great way to bond with colleagues. Highly recommend!",
      rating: 5,
      journeyId: journey3.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 11 },
    update: {},
    create: {
      authorId: grace.id,
      content: "The outdoor escape was disappointing. Not worth the time.",
      rating: 2,
      journeyId: journey4.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 12 },
    update: {},
    create: {
      authorId: isabella.id,
      content:
        "The mysterious island was underwhelming. Expected more excitement.",
      rating: 3,
      journeyId: journey4.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 13 },
    update: {},
    create: {
      authorId: charlie.id,
      content: "The enchanted forest was a letdown. Lackluster experience.",
      rating: 2,
      journeyId: journey4.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 15 },
    update: {},
    create: {
      authorId: isabella.id,
      content:
        "The epic quest was absolutely thrilling! The challenges were mind-bending.",
      rating: 5,
      journeyId: journey5.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 16 },
    update: {},
    create: {
      authorId: henry.id,
      content:
        "The mystic temple was an incredible experience. The riddles were challenging but solvable.",
      rating: 4,
      journeyId: journey5.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 17 },
    update: {},
    create: {
      authorId: charlie.id,
      content:
        "The virtual reality adventure was mind-blowing! It felt like being in a different world.",
      rating: 5,
      journeyId: journey5.id,
    },
  });

  const bobEvents = await prisma.userEvent.findMany({
    where: { userId: bob.id },
    select: { eventId: true },
  });

  const henryEvents = await prisma.userEvent.findMany({
    where: { userId: henry.id },
    select: { eventId: true },
  });

  const graceEvents = await prisma.userEvent.findMany({
    where: { userId: grace.id },
    select: { eventId: true },
  });

  const generateEventUserStep = async (userId: number, eventIds: number[]) => {
    for (const eventId of eventIds) {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { journeyId: true },
      });
      if (!event) continue;

      const journey = await prisma.journey.findUnique({
        where: { id: event.journeyId },
        select: { id: true, steps: true },
      });

      if (!journey) continue;

      // Randomize the number of steps completed by the user for this event
      const numberOfStepsToComplete = Math.floor(
        Math.random() * journey.steps.length,
      );

      for (let i = 0; i < numberOfStepsToComplete; i++) {
        const step = journey.steps[i];
        const startAt = new Date();
        // Randomly generate a duration between 30 minutes and 2 hours for each step
        const endAt = new Date(
          startAt.getTime() +
            Math.floor(
              Math.random() * (2 * 60 * 60 * 1000 - 30 * 60 * 1000 + 1),
            ) +
            30 * 60 * 1000,
        );
        const duration = endAt.getTime() - startAt.getTime();

        await prisma.eventUserStep.create({
          data: {
            userId,
            stepId: step.id,
            eventId,
            startAt,
            endAt,
            durationMs: duration,
          },
        });
      }
    }
  };

  await generateEventUserStep(
    bob.id,
    bobEvents.map((event) => event.eventId),
  );
  await generateEventUserStep(
    henry.id,
    henryEvents.map((event) => event.eventId),
  );
  await generateEventUserStep(
    grace.id,
    graceEvents.map((event) => event.eventId),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
