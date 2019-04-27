using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AwesomeGiveaways.Hubs
{
    public class GiveawayHub : Hub
    {
        [HubMethodName("UpdateParticipantCounter")]
        public async Task UpdateParticipantCounter(int count)
        {
            await Clients.All.SendAsync("counterReceived", count);
        }
    }
}
