﻿using QX_Frame.App.Base;
using QX_Frame.Data.Entities.QX_Frame;
using QX_Frame.Data.Options;
using QX_Frame.Data.QueryObject;
using QX_Frame.Data.Service.QX_Frame;
using QX_Frame.Helper_DG;
using QX_Frame.Helper_DG.Extends;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Web;

namespace QX_Frame.ConsoleApp
{
    class Program: AppBase
    {
        static void Main(string[] args)
        {
            new ClassRegisters();   //register classes

            //tb_UserAccountQueryObject query = new tb_UserAccountQueryObject();

            //using (var fact = Wcf<UserAccountService>())
            //{

            //    var channel = fact.CreateChannel();
            //    int count;
            //    List<tb_UserAccount> list = channel.QueryAll(query).Cast<List<tb_UserAccount>>(out count);
            //    foreach (var item in list)
            //    {
            //        Console.WriteLine($"item loginId={item.loginId}");
            //    }
            //}


            Console.WriteLine("any key to exit ...");
            Console.ReadKey();
        }
    }
}