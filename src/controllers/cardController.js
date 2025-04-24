import CardModel from "../models/cardModel.js";

class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    try {
      const cartas = await CardModel.findAll();
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /cartas/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrada!" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // POST /cartas
  async createCard(req, res) {
    try {
      // Captura os dados do corpo da requisição
      const {
        name,
        rarety,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Verifica se todos os campos de cartas foram fornecidos
      if (
        !name ||
        !rarety ||
        !attackPoints ||
        !defensePoints ||
        !collectionId
      ) {
        return res.status(400).json({
          error:
            "Os campos nome, raridade, pontos de ataque, pontos de defesa e id da coleção são obrigatórios",
        });
      }

      // Criar a nova carta
      const novaCarta = await CardModel.create(
        name,
        rarety,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!novaCarta) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json({ message: "Carta criada com sucesso!", novaCarta });
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta" });
    }
  }

  // PUT /carta/:id
  async updateCard(req, res) {
    try {
      const { id } = req.params;

      const {
        name,
        rarety,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      } = req.body;

      // Atualizar a carta
      const updatedCard = await CardModel.update(
        id,
        name,
        rarety,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta!" });
    }
  }

  // DELETE /carta/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover a carta
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.status(200).json({ message: "Carta removida com sucesso!" });
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover carta" });
    }
  }
}

export default new CardController();
