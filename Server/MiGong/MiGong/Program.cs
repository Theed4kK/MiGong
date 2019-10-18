using System;
using System.Net;
using System.Net.Sockets;

namespace MiGong
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            StartServer();
            Console.ReadLine();
        }

        private static void StartServer()
        {
            Socket server = new Socket(AddressFamily.InterNetwork,SocketType.Stream,ProtocolType.Tcp);
            server.Bind(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 8989));

            server.Listen(10);
            server.BeginAccept(AcceptCallBack, server);
        }

        private static void AcceptCallBack(IAsyncResult ar)
        {
            Socket server = ar.AsyncState as Socket;

            Socket client = server.EndAccept(ar);
            Console.WriteLine($"用户{client.AddressFamily}接入");
        }
    }
}
