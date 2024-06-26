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
      avatar: "https://picsum.photos/200/300",
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
      avatar: "https://picsum.photos/200/301",
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
      avatar: "https://picsum.photos/200/302",
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
      avatar: "https://picsum.photos/200/303",
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
      avatar: "https://picsum.photos/200/304",
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
      avatar: "https://picsum.photos/200/305",
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
      avatar: "https://picsum.photos/200/306",
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
      avatar: "https://picsum.photos/200/307",
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
      avatar: "https://picsum.photos/200/308",
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
      title: "Chasse au trésor dans le Vieux Paris",
      description:
        "Découvrez le patrimoine historique de Paris en résolvant des énigmes et en suivant des indices pour trouver le trésor caché.",
      requirement:
        "Aucune compétence spécifique requise. Convient à tous les âges.",
      treasure: "Un coffre rempli de pièces d'or et de souvenirs historiques.",
      estimatedDistance: 5,
      estimatedDuration: 2,
      cluesDifficulty: 2,
      physicalDifficulty: 1,
      lastCompletion: new Date("2021-01-01"),
      mobilityImpaired: "Partiellement accessible",
      partiallySighted: "Partiellement accessible",
      partiallyDeaf: "Partiellement accessible",
      cognitivelyImpaired: "Partiellement accessible",
      steps: {
        create: [
          {
            puzzle:
              "Quelle célèbre tour de Paris est connue pour sa structure en fer?",
            answer: "Tour Eiffel",
            hint: "Elle a été construite par Gustave Eiffel pour l'Exposition universelle de 1889.",
            picturePuzzle: "https://picsum.photos/300/200?random=1",
            pictureHint: "https://picsum.photos/300/201?random=2",
            latitude: 48.8584,
            longitude: 2.2945,
            address: "Champ de Mars, 5 Avenue Anatole France",
            city: "Paris",
            postalCode: "75007",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Quel célèbre musée abrite la Joconde?",
            answer: "Musée du Louvre",
            hint: "Il est situé dans le Palais du Louvre, l'ancienne résidence des rois de France.",
            picturePuzzle: "https://picsum.photos/300/202?random=3",
            pictureHint: "https://picsum.photos/300/203?random=4",
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
              "Dans quel quartier de Paris se trouve la Cathédrale Notre-Dame?",
            answer: "Île de la Cité",
            hint: "Elle est située sur une île au milieu de la Seine.",
            picturePuzzle: "https://picsum.photos/300/204?random=5",
            pictureHint: "https://picsum.photos/300/205?random=6",
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
              "Quel célèbre cabaret est connu pour ses spectacles de danse et de musique?",
            answer: "Moulin Rouge",
            hint: "Il est situé dans le quartier de Pigalle, connu pour sa vie nocturne animée.",
            picturePuzzle: "https://picsum.photos/300/206?random=7",
            pictureHint: "https://picsum.photos/300/207?random=8",
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
              "Quel célèbre monument commémore les soldats français morts pendant la Première Guerre mondiale?",
            answer: "Arc de Triomphe",
            hint: "Il est situé au bout de l'avenue des Champs-Élysées.",
            picturePuzzle: "https://picsum.photos/300/208?random=9",
            pictureHint: "https://picsum.photos/300/209?random=10",
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
              "Quelle célèbre basilique est située sur le point culminant de Paris?",
            answer: "Basilique du Sacré-Cœur",
            hint: "Elle offre une vue panoramique sur la ville depuis son dôme.",
            picturePuzzle: "https://picsum.photos/300/210?random=11",
            pictureHint: "https://picsum.photos/300/211?random=12",
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
              "Quelle célèbre avenue de Paris est connue pour ses boutiques de luxe et ses théâtres?",
            answer: "Champs-Élysées",
            hint: "Elle est souvent appelée 'la plus belle avenue du monde'.",
            picturePuzzle: "https://picsum.photos/300/212?random=13",
            pictureHint: "https://picsum.photos/300/213?random=14",
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
              "Quel célèbre opéra de Paris est connu pour son architecture grandiose?",
            answer: "Palais Garnier",
            hint: "Il a été conçu par Charles Garnier et ouvert en 1875.",
            picturePuzzle: "https://picsum.photos/300/214?random=15",
            pictureHint: "https://picsum.photos/300/215?random=16",
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
      title: "Chasse au trésor dans le Quartier Latin",
      description:
        "Explorez le Quartier Latin à Paris en résolvant des énigmes et en suivant des indices pour trouver le trésor caché.",
      requirement:
        "Aucune compétence spécifique requise. Convient à tous les âges.",
      treasure: "Un coffre rempli de pièces d'or et de souvenirs culturels.",
      estimatedDistance: 2,
      estimatedDuration: 1,
      cluesDifficulty: 2,
      physicalDifficulty: 1,
      lastCompletion: new Date("2021-02-01"),
      mobilityImpaired: "Partiellement accessible",
      partiallySighted: "Partiellement accessible",
      partiallyDeaf: "Partiellement accessible",
      cognitivelyImpaired: "Partiellement accessible",
      steps: {
        create: [
          {
            puzzle:
              "Quelle célèbre université est située dans le Quartier Latin?",
            answer: "Sorbonne",
            hint: "Elle a été fondée en 1257 et est l'une des plus anciennes universités du monde.",
            picturePuzzle: "https://picsum.photos/300/216?random=17",
            pictureHint: "https://picsum.photos/300/217?random=18",
            latitude: 48.8462,
            longitude: 2.3444,
            address: "1 Rue Victor Cousin",
            city: "Paris",
            postalCode: "75005",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Quel célèbre monument est situé près de la Sorbonne?",
            answer: "Panthéon",
            hint: "Il a été construit en 1790 et abrite les tombes de personnalités célèbres.",
            picturePuzzle: "https://picsum.photos/300/218?random=19",
            pictureHint: "https://picsum.photos/300/219?random=20",
            latitude: 48.8466,
            longitude: 2.3469,
            address: "Place du Panthéon",
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
      title: "Chasse au trésor à travers le patrimoine de Rouen",
      description:
        "Partez à la découverte du patrimoine historique et culturel de Rouen en résolvant des énigmes et en suivant des indices pour trouver le trésor caché.",
      requirement:
        "Aucune compétence spécifique requise. Convient à tous les âges.",
      treasure: "Un coffre rempli de pièces d'or et de souvenirs historiques.",
      estimatedDistance: 5,
      estimatedDuration: 2.5,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-03-01"),
      mobilityImpaired: "Partiellement accessible",
      partiallySighted: "Partiellement accessible",
      partiallyDeaf: "Partiellement accessible",
      cognitivelyImpaired: "Partiellement accessible",
      steps: {
        create: [
          {
            puzzle:
              "Quel célèbre monument est situé sur la Place du Vieux-Marché?",
            answer: "Église Sainte-Jeanne-d'Arc",
            hint: "Cette église est dédiée à Jeanne d'Arc et est située sur le site où elle a été brûlée vive.",
            picturePuzzle: "https://picsum.photos/300/220?random=21",
            pictureHint: "https://picsum.photos/300/221?random=22",
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
              "Quel célèbre musée est situé sur la rive gauche de la Seine?",
            answer: "Musée des Beaux-Arts de Rouen",
            hint: "Ce musée abrite une importante collection d'œuvres d'art du Moyen Âge au XXIe siècle.",
            picturePuzzle: "https://picsum.photos/300/222?random=23",
            pictureHint: "https://picsum.photos/300/223?random=24",
            latitude: 49.4427,
            longitude: 1.0931,
            address: "Esplanade Marcel Duchamp",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle:
              "Quel célèbre monument est situé sur la Place de la Cathédrale?",
            answer: "Cathédrale de Rouen",
            hint: "Cette cathédrale est l'une des plus grandes structures gothiques d'Europe et a inspiré de nombreux artistes, dont Claude Monet.",
            picturePuzzle: "https://picsum.photos/300/224?random=25",
            pictureHint: "https://picsum.photos/300/225?random=26",
            latitude: 49.44,
            longitude: 1.0949,
            address: "Place de la Cathédrale",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 3,
          },
          {
            puzzle:
              "Quelle célèbre place est située près de la Cathédrale de Rouen?",
            answer: "Place du Général de Gaulle",
            hint: "Cette place est nommée d'après l'ancien président français et est un lieu de rencontre populaire à Rouen.",
            picturePuzzle: "https://picsum.photos/300/226?random=27",
            pictureHint: "https://picsum.photos/300/227?random=28",
            latitude: 49.4407,
            longitude: 1.0937,
            address: "Place du Général de Gaulle",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 4,
          },
          {
            puzzle:
              "Quelle célèbre horloge est située dans la rue du Gros-Horloge?",
            answer: "Gros-Horloge",
            hint: "Cette horloge astronomique est l'une des principales attractions de Rouen et date du XIVe siècle.",
            picturePuzzle: "https://picsum.photos/300/228?random=29",
            pictureHint: "https://picsum.photos/300/229?random=30",
            latitude: 49.4402,
            longitude: 1.0941,
            address: "Rue du Gros-Horloge",
            city: "Rouen",
            postalCode: "76000",
            country: "France",
            stepNumber: 5,
          },
          {
            puzzle: "Quelle célèbre place est située près du Gros-Horloge?",
            answer: "Place de la Pucelle",
            hint: "Cette place est nommée d'après Jeanne d'Arc, également connue sous le nom de la Pucelle d'Orléans.",
            picturePuzzle: "https://picsum.photos/300/230?random=31",
            pictureHint: "https://picsum.photos/300/231?random=32",
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
              "Quelle célèbre rue est connue pour ses maisons à colombages?",
            answer: "Rue du Gros-Horloge",
            hint: "Cette rue est l'une des plus pittoresques de Rouen et est bordée de belles maisons à colombages.",
            picturePuzzle: "https://picsum.photos/300/232?random=33",
            pictureHint: "https://picsum.photos/300/233?random=34",
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
              "Quelle célèbre place est située près de la rue du Gros-Horloge?",
            answer: "Place de la Calende",
            hint: "Cette place est un quartier animé de Rouen avec de nombreux magasins, cafés et restaurants.",
            picturePuzzle: "https://picsum.photos/300/234?random=35",
            pictureHint: "https://picsum.photos/300/235?random=36",
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
      title: "Chasse au trésor dans le Vieux Nice",
      description:
        "Découvrez le patrimoine historique de Nice en résolvant des énigmes et en suivant des indices pour trouver le trésor caché.",
      requirement:
        "Aucune compétence particulière requise. Convient à tous les âges.",
      treasure: "Un coffre rempli de pièces d'or et de souvenirs historiques.",
      estimatedDistance: 4,
      estimatedDuration: 2,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-04-01"),
      mobilityImpaired: "Partiellement accessible",
      partiallySighted: "Partiellement accessible",
      partiallyDeaf: "Partiellement accessible",
      cognitivelyImpaired: "Partiellement accessible",
      steps: {
        create: [
          {
            puzzle:
              "Quel célèbre monument est situé sur la Promenade des Anglais?",
            answer: "Hôtel Negresco",
            hint: "Cet hôtel emblématique est un symbole de la ville de Nice.",
            picturePuzzle: "https://picsum.photos/300/236?random=37",
            pictureHint: "https://picsum.photos/300/237?random=38",
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
              "Quel célèbre parc est situé au sommet de la Colline du Château?",
            answer: "Parc de la Colline du Château",
            hint: "Ce parc offre une vue panoramique sur la ville de Nice.",
            picturePuzzle: "https://picsum.photos/300/238?random=39",
            pictureHint: "https://picsum.photos/300/239?random=40",
            latitude: 43.6965,
            longitude: 7.2827,
            address: "Montée du Château",
            city: "Nice",
            postalCode: "06300",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle: "Quel célèbre musée est situé sur la Place Garibaldi?",
            answer: "Musée d'Art Moderne et d'Art Contemporain",
            hint: "Ce musée abrite une collection d'art moderne et contemporain.",
            picturePuzzle: "https://picsum.photos/300/240?random=41",
            pictureHint: "https://picsum.photos/300/241?random=42",
            latitude: 43.7037,
            longitude: 7.2794,
            address: "Place Yves Klein",
            city: "Nice",
            postalCode: "06300",
            country: "France",
            stepNumber: 3,
          },
          {
            puzzle: "Quel célèbre marché est situé sur la Place Masséna?",
            answer: "Marché aux Fleurs",
            hint: "Ce marché coloré offre une grande variété de fleurs et de plantes.",
            picturePuzzle: "https://picsum.photos/300/242?random=43",
            pictureHint: "https://picsum.photos/300/243?random=44",
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
      title: "Chasse au trésor à travers le patrimoine de Toulouse",
      description:
        "Partez à la découverte du patrimoine historique et culturel de Toulouse en résolvant des énigmes et en suivant des indices pour trouver le trésor caché.",
      requirement:
        "Aucune compétence particulière requise. Convient à tous les âges.",
      treasure: "Un coffre rempli de pièces d'or et de souvenirs historiques.",
      estimatedDistance: 5,
      estimatedDuration: 2.5,
      cluesDifficulty: 3,
      physicalDifficulty: 2,
      lastCompletion: new Date("2021-05-01"),
      mobilityImpaired: "Partiellement accessible",
      partiallySighted: "Partiellement accessible",
      partiallyDeaf: "Partiellement accessible",
      cognitivelyImpaired: "Partiellement accessible",
      steps: {
        create: [
          {
            puzzle: "Quel célèbre monument est situé sur la Place du Capitole?",
            answer: "Capitole de Toulouse",
            hint: "Le Capitole est l'hôtel de ville de Toulouse et abrite également le Théâtre du Capitole.",
            picturePuzzle: "https://picsum.photos/300/244?random=45",
            pictureHint: "https://picsum.photos/300/245?random=46",
            latitude: 43.6045,
            longitude: 1.444,
            address: "Place du Capitole",
            city: "Toulouse",
            postalCode: "31000",
            country: "France",
            stepNumber: 1,
          },
          {
            puzzle: "Quel célèbre musée est situé sur les Allées Jules Guesde?",
            answer: "Musée des Augustins",
            hint: "Le Musée des Augustins est un musée d'art situé dans un ancien couvent augustinien.",
            picturePuzzle: "https://picsum.photos/300/246?random=47",
            pictureHint: "https://picsum.photos/300/247?random=48",
            latitude: 43.5992,
            longitude: 1.4436,
            address: "21 Rue de Metz",
            city: "Toulouse",
            postalCode: "31000",
            country: "France",
            stepNumber: 2,
          },
          {
            puzzle:
              "Quel célèbre monument est situé sur la Place Saint-Sernin?",
            answer: "Basilique Saint-Sernin",
            hint: "La Basilique Saint-Sernin est une église romane et un important site de pèlerinage.",
            picturePuzzle: "https://picsum.photos/300/248?random=49",
            pictureHint: "https://picsum.photos/300/249?random=50",
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
      title: "Course Incroyable",
      image: "https://picsum.photos/400/200?random=51",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Rejoignez-nous pour une course excitante remplie de défis et d'énigmes!",
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
      title: "Aventure Escape Room",
      image: "https://picsum.photos/400/201?random=52",
      numberPlayerMax: 5,
      numberPlayerMin: 1,
      description:
        "Pouvez-vous résoudre les énigmes et échapper à la pièce à temps?",
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
      title: "Chasse au Trésor",
      image: "https://picsum.photos/400/202?random=53",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Lancez-vous dans une chasse au trésor palpitante et découvrez des secrets cachés!",
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
      image: "https://picsum.photos/400/203?random=54",
      numberPlayerMax: 12,
      numberPlayerMin: 3,
      description:
        "Explorez le manoir hanté et résolvez le mystère qui s'y cache!",
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
      title: "Défi Enigme",
      image: "https://picsum.photos/400/204?random=55",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Testez vos compétences en résolution d'énigmes dans cette aventure stimulante!",
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
      title: "Expédition en Plein Air",
      image: "https://picsum.photos/400/205?random=56",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Partez pour une expédition en plein air excitante et relevez les défis de la nature!",
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
      title: "Chasse au Trésor Urbain",
      image: "https://picsum.photos/400/206?random=57",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Explorez la ville et résolvez des indices pour compléter la chasse au trésor ultime!",
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
      title: "Défi de Cohésion d'Équipe",
      image: "https://picsum.photos/400/207?random=58",
      numberPlayerMax: 4,
      numberPlayerMin: 1,
      description:
        "Renforcez les compétences en travail d'équipe et en communication dans ce défi de cohésion d'équipe passionnant!",
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
      title: "Évasion en Plein Air",
      image: "https://picsum.photos/400/208?random=59",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Échappez à l'ordinaire et plongez dans une aventure en plein air inoubliable!",
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
      title: "Île Mystérieuse",
      image: "https://picsum.photos/400/209?random=60",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Découvrez les secrets d'une île mystérieuse dans cette aventure palpitante!",
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
      title: "Forêt Enchantée",
      image: "https://picsum.photos/400/210?random=61",
      numberPlayerMax: 12,
      numberPlayerMin: 3,
      description:
        "Entrez dans la forêt enchantée et embarquez pour un voyage magique comme aucun autre!",
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
      title: "Quête Épique",
      image: "https://picsum.photos/400/211?random=62",
      numberPlayerMax: 10,
      numberPlayerMin: 1,
      description:
        "Partez pour une quête épique remplie de défis, d'énigmes et d'aventures!",
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
      title: "Temple Mystique",
      image: "https://picsum.photos/400/212?random=63",
      numberPlayerMax: 8,
      numberPlayerMin: 2,
      description:
        "Entrez dans le temple mystique et résolvez des énigmes anciennes pour découvrir ses secrets!",
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
      title: "Aventure en Réalité Virtuelle",
      image: "https://picsum.photos/400/213?random=64",
      numberPlayerMax: 6,
      numberPlayerMin: 1,
      description:
        "Plongez dans une aventure en réalité virtuelle passionnante comme jamais auparavant!",
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
      content: "Expérience géniale! J'ai adoré chaque instant.",
      rating: 4,
      journeyId: journey1.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      authorId: charlie.id,
      content: "Très recommandé! Les défis étaient engageants et amusants.",
      rating: 5,
      journeyId: journey1.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      authorId: david.id,
      content: "Course incroyable! J'ai hâte de participer à nouveau.",
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
        "La chasse au trésor était tellement amusante! Nous avons trouvé le trésor caché!",
      rating: 5,
      journeyId: journey2.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 6 },
    update: {},
    create: {
      authorId: grace.id,
      content:
        "Les énigmes étaient difficiles mais gratifiantes. Je recommande vivement!",
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
        "La chasse au trésor était une excellente activité de team-building. Pouces en l'air!",
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
        "L'expédition en plein air était une aventure incroyable! J'ai adoré chaque moment.",
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
        "La chasse au trésor en ville était tellement amusante! Nous avons exploré des trésors cachés dans la ville.",
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
        "Le défi de team-building était un excellent moyen de renforcer les liens avec les collègues. Je recommande vivement!",
      rating: 5,
      journeyId: journey3.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 11 },
    update: {},
    create: {
      authorId: grace.id,
      content:
        "L'évasion en plein air était décevante. Pas la peine de perdre son temps.",
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
        "L'île mystérieuse était décevante. Je m'attendais à plus d'excitation.",
      rating: 3,
      journeyId: journey4.id,
    },
  });

  await prisma.comment.upsert({
    where: { id: 13 },
    update: {},
    create: {
      authorId: charlie.id,
      content: "La forêt enchantée était décevante. Une expérience insipide.",
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
        "La quête épique était absolument palpitante! Les défis étaient incroyables.",
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
        "Le temple mystique était une expérience incroyable. Les énigmes étaient difficiles mais faisables.",
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
        "L'aventure en réalité virtuelle était époustouflante! C'était comme être dans un autre monde.",
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
