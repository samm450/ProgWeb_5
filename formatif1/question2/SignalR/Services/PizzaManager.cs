namespace SignalR.Services
{
    // Pizza avec ou sans ananas
    public enum PizzaChoice
    {
        WITHOUT_PINEAPPLE,
        WITH_PINEAPPLE
    }

    public class PizzaManager
    {
        public int NbConnectedUsers { get; private set; }

        public int MONEY_INCREMENT = 2;
        public readonly int[] PIZZA_PRICES = new int[2] { 10, 12 };

        // Le data pour les 2 types de pizza
        public int[] Money { get; private set; } = new int[2];
        public int[] NbPizzas { get; private set; } = new int[2];

        public void AddUser()
        {
            NbConnectedUsers++;
        }

        public void RemoveUser()
        {
            NbConnectedUsers--;
        }

        public void IncreaseMoney(PizzaChoice choice)
        {
            Money[(int)choice] += MONEY_INCREMENT;
        }

        public void BuyPizza(PizzaChoice choice)
        {
            // Si il y a assez d'argent
            if(Money[(int)choice] >= PIZZA_PRICES[(int)choice])
            {
                // On retire l'argent
                Money[(int)choice] -= PIZZA_PRICES[(int)choice];
                // Et augmente le nombre de pizzas
                NbPizzas[(int)choice]++;
            }
        }

        public string GetGroupName(PizzaChoice choice)
        {
            return choice.ToString() + "_Group";
        }
    }
}
