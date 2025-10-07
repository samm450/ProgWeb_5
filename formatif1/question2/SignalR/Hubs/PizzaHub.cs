using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            _pizzaManager.AddUser();
            int nbUser = _pizzaManager.NbConnectedUsers;
            await Clients.All.SendAsync("UpdateNbUsers", nbUser);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnConnectedAsync();
            _pizzaManager.RemoveUser();
            int nbUser = _pizzaManager.NbConnectedUsers;
            await Clients.All.SendAsync("UpdateNbUsers", nbUser);
        }
        
        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            int prix = _pizzaManager.PIZZA_PRICES[(int)choice];
            int NbPizza = _pizzaManager.NbPizzas[(int)choice];
            int ArgentTotal = _pizzaManager.Money[(int)choice];

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("EnvoiePrix", prix, NbPizza, ArgentTotal);



        }

        public async Task UnselectChoice(PizzaChoice choice)
        {

        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            int argentAjouter = _pizzaManager.Money[(int)choice];
            string groupName = _pizzaManager.GetGroupName(choice);

            await Clients.Group(groupName).SendAsync("EnvoieTotal", argentAjouter);



        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            
            _pizzaManager.BuyPizza(choice);

            int argentTotal = _pizzaManager.Money[(int)choice];
            int nbPizza = _pizzaManager.NbPizzas[(int)choice];

            
            string groupName = _pizzaManager.GetGroupName(choice);

            await Clients.Group(groupName).SendAsync("AcheterPizza", argentTotal, nbPizza);

        }
    }
}
