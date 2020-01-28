using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Hubs
{
    /**
     * Prilikom pristizanja svake poruke instancira se novi Hub koji
     * je obradjuje.
     * **/
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();

        private static System.Timers.Timer timer = new System.Timers.Timer();


        double[] result = new double[2];
        double[] currPos = new double[2];
        int numDeltas = 250;
        int i = 0;
        double deltaLat;
        double deltaLng;


        public NotificationHub()
        {
            Console.WriteLine();
        }

        public void GetTime()
        {
            //Svim klijentima se salje setRealTime poruka
            Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }

        public void TimeServerUpdates(Station[] stations)
        {
            if (stations.Length > 1)
            {
                Station[] temp = stations;

                for (int x = 0; x < temp.Length - 1; ++x)
                {
                    Thread.Sleep(1500);
                    i = 0;

                    currPos[0] = temp[x].XCoordinate;
                    currPos[1] = temp[x].YCoordinate;

                    result[0] = temp[x + 1].XCoordinate;
                    result[1] = temp[x + 1].YCoordinate;
                    Debug.WriteLine("RESULT " + currPos[0] + currPos[1]);
                    Debug.WriteLine("TRENUTNA " + result[0] + result[1]);

                    timer.Interval = 300;
                    timer.Start();
                    timer.Elapsed += OnTimedEvent;

                    Transition();
                }
            }
        }

        private void Transition()
        {

            Debug.WriteLine("TRANS " + currPos[0] + currPos[1]);

            deltaLat = (result[0] - currPos[0]) / numDeltas;
            deltaLng = (result[1] - currPos[1]) / numDeltas;
            MoveMarker();
        }

        private void MoveMarker()
        {
            Debug.WriteLine(i);
            //Debug.WriteLine(i + "   MOVE " + currPos[0] + currPos[1]);

            currPos[0] += deltaLat;
            currPos[1] += deltaLng;
            //posalji na front

            if (i != numDeltas)
            {
                i++;
                Thread.Sleep(200);
                MoveMarker();
            }
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            //GetTime();
            //Debug.WriteLine("a ovo");
            Clients.All.setRealTime(currPos);
        }

        public void StopTimeServerUpdates()
        {
            Debug.WriteLine("OCE STATI");
            timer.Stop();
        }

        public void NotifyAdmins(int clickCount)
        {
            hubContext.Clients.Group("Admins").userClicked($"Clicks: {clickCount}");
        }

        public override Task OnConnected()
        {
            if (Context.User.IsInRole("Admin"))
            {
                Groups.Add(Context.ConnectionId, "Admins");
            }

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            if (Context.User.IsInRole("Admin"))
            {
                Groups.Remove(Context.ConnectionId, "Admins");
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}