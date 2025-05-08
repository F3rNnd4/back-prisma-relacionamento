import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as cartas
  async findAll(rarity, attack, page, limit, name) {
    if (Number(page) < 1) {
      page = 1;
    }

    if (Number(limit) < 1 || Number(limit) > 100) {
      limit = 10;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const where = {};

    if (rarity) {
      where.rarity = rarity;
    }

    if (attack) {
      where.attackPoints = {
        gte: Number(attack),
      };
    }

    if (name) {
      where.name = {
        contains: name, // Verifica se o nome contém a string fornecida
      };
    }

    const cartas = await prisma.card.findMany({
      /* where: {
         rarity: "Ultra Rare",
       }, 
       where: {
         defensePoints: {
           lte: 8000,
       },
         },*/

      /*where: {
       attackPoints: {
          gte: Number(attack),
        },
        rarity: rarity,
      },*/
      skip,
      take: Number(limit),
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collection: {
          select: {
            name: true,
            description: true,
            releaseYear: true,
          },
        },
      },
    });

    const totalExibidos = cartas.length;
    const total = await prisma.card.count({
      where,
    });

    // console.log(cartas);

    return { totalExibidos, total, cartas };
  }

  // Obter uma carta pelo ID
  async findById(id) {
    const carta = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        collection: true,
      },
    });

    return carta;
  }

  // Criar uma nova carta
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const novaCarta = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId),
      },
    });

    return novaCarta;
  }

  // Atualizar uma carta
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    // Atualize uma carta existente com os novos dados
    const cartaAtualizada = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId: Number(collectionId),
      },
    });

    return cartaAtualizada;
  }

  // Remover uma carta
  async delete(id) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
