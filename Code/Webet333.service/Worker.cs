using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Webet333.service.Model;

namespace Webet333.service
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;

        public static string Token = string.Empty;

        private async Task<string> APICallPost(string Url, object request = null)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    if (!string.IsNullOrEmpty(Token))
                    {
                        client.DefaultRequestHeaders.Clear();
                        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {Token}");
                    }

                    var stringContent = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    dynamic httpResponseMessage = await client.PostAsync(Url, stringContent);

                    var result = await httpResponseMessage.Content.ReadAsStringAsync();

                    return result;
                }
            }
            catch (Exception ex)
            {
                WriteErrorTextToFile("Error :" + ex.Message);

                return ex.Message.ToString();
            }
        }

        private async Task<string> APICallGet(string Url)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var httpResponseMessage = client.GetAsync(Url).Result;
                    return await httpResponseMessage.Content.ReadAsStringAsync();
                }
            }
            catch (Exception ex)
            {
                WriteErrorTextToFile("Error :" + ex.Message);

                return ex.Message.ToString();
            }
        }

        public Worker(ILogger<Worker> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                    WriteTextToFile("Service recalled at " + DateTime.Now);

                    await CallRegisterGameAPIs();

                    await Task.Delay(10000, stoppingToken);
                }
            }
            catch (Exception ex)
            {
                WriteErrorTextToFile("Error :" + ex.Message);

                GC.Collect();
                GC.WaitForPendingFinalizers();

                var newobj = new CancellationToken();
                await ExecuteAsync(newobj);
            }
        }

        public void WriteTextToFile(string Message)
        {
            string checkPath = AppDomain.CurrentDomain.BaseDirectory + "\\LogsFile";

            if (!Directory.Exists(checkPath)) Directory.CreateDirectory(checkPath);

            string filepath = AppDomain.CurrentDomain.BaseDirectory + "\\LogsFile\\ServiceLog_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt";

            if (!File.Exists(filepath))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
            else
            {
                using (StreamWriter sw = File.AppendText(filepath))
                {
                    sw.WriteLine(Message);
                }
            }
        }

        public void WriteErrorTextToFile(string Message)
        {
            string checkPath = AppDomain.CurrentDomain.BaseDirectory + "\\LogsFile";

            if (!Directory.Exists(checkPath)) Directory.CreateDirectory(checkPath);

            string filepath = AppDomain.CurrentDomain.BaseDirectory + "\\LogsFile\\ServiceErrorLog_" + DateTime.Now.ToString("dd_MM_yyyy") + ".txt";

            if (!File.Exists(filepath))
            {
                // Create a file to write to.
                using StreamWriter sw = File.CreateText(filepath);
                sw.WriteLine(Message);
            }
            else
            {
                using StreamWriter sw = File.AppendText(filepath);
                sw.WriteLine(Message);
            }
        }

        public async Task CallRegisterGameAPIs()
        {
            Token = null;

            var LoginRequest = new LoginRequest()
            {
                GrantType = GrantTypeEnums.admin,
                UserName = "WindowsServiceAdmin",
                Password = "WindowsServiceAdmin"
            };

            var login_result = JsonConvert.DeserializeObject<LoginResponse>(await APICallPost(APIConst.baseUrl + APIConst.login, request: LoginRequest));
            Token = login_result.data.access_token;

            if (Token != null)
            {
                var userlist = JsonConvert.DeserializeObject<UserListResponse>(await APICallGet(APIConst.baseUrl + APIConst.nonRegisterUsers)).data;
                WriteTextToFile("Service recalled at " + DateTime.Now + " || UserList Count --> " + userlist.Count);
                //var agList = userlist.Where(x => x.GameName == "AG").ToList();
                //var jokerList = userlist.Where(x => x.GameName == "JOKER").ToList();
                //var m8List = userlist.Where(x => x.GameName == "M8").ToList();
                //var maxbetList = userlist.Where(x => x.GameName == "MAXBET").ToList();
                //var mega888List = userlist.Where(x => x.GameName == "MEGA888").ToList();
                //var playtechList = userlist.Where(x => x.GameName == "PLAYTECH").ToList();
                //var kiss918List = userlist.Where(x => x.GameName == "KISS918").ToList();
                var yeeBetList = userlist.Where(x => x.GameName == "YeeBet").ToList();
                var SBOList = userlist.Where(x => x.GameName == "SBO").ToList();
                var GamePlayList = userlist.Where(x => x.GameName == "GamePlay").ToList();

                //try
                //{
                //    if (agList.Count > 0)
                //    {
                //        for (int i = 0; i < agList.Count; i++)
                //        {
                //            var RegisterRequest = new RegisterRequest()
                //            {
                //                GamePrefix = agList[i].Prefix,
                //                Name = agList[i].Name,
                //                Password = agList[i].Password,
                //                MobileNo = agList[i].Mobile,
                //                UserId = agList[i].UserId,
                //                Username = agList[i].Username
                //            };
                //            var agresult = await APICallPost(APIConst.baseUrl + APIConst.registerAG, request: RegisterRequest);
                //            Console.WriteLine(agresult);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (m8List.Count > 0)
                //    {
                //        for (int i = 0; i < m8List.Count; i++)
                //        {
                //            var RegisterRequest = new RegisterRequest()
                //            {
                //                GamePrefix = m8List[i].Prefix,
                //                Name = m8List[i].Name,
                //                Password = m8List[i].Password,
                //                MobileNo = m8List[i].Mobile,
                //                UserId = m8List[i].UserId,
                //                Username = m8List[i].Username
                //            };
                //            var m8result = await APICallPost(APIConst.baseUrl + APIConst.registerM8, request: RegisterRequest);
                //            Console.WriteLine(m8result);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (jokerList.Count > 0)
                //    {
                //        for (int i = 0; i < jokerList.Count; i++)
                //        {
                //            var RegisterRequest = new RegisterRequest()
                //            {
                //                GamePrefix = jokerList[i].Prefix,
                //                Name = jokerList[i].Name,
                //                Password = jokerList[i].Password,
                //                MobileNo = jokerList[i].Mobile,
                //                UserId = jokerList[i].UserId,
                //                Username = jokerList[i].Username
                //            };
                //            var jokerresult = await APICallPost(APIConst.baseUrl + APIConst.registerJoker, request: RegisterRequest);
                //            Console.WriteLine(jokerresult);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (maxbetList.Count > 0)
                //    {
                //        for (int i = 0; i < maxbetList.Count; i++)
                //        {
                //            var RegisterRequest = new MaxBetRegister()
                //            {
                //                Currency = 2,
                //                Custominfo1 = "",
                //                Custominfo2 = "",
                //                Custominfo3 = "",
                //                Custominfo4 = "",
                //                Custominfo5 = "",
                //                Firstname = maxbetList[i].Name,
                //                Lastname = "webet333",
                //                maxtransfer = 9999999,
                //                mintransfer = 1,
                //                UserId = new Guid(maxbetList[i].UserId),
                //                Username = maxbetList[i].Username
                //            };
                //            var maxresult = await APICallPost(APIConst.baseUrl + APIConst.registerMaxBet, request: RegisterRequest);
                //            Console.WriteLine(maxresult);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (mega888List.Count > 0)
                //    {
                //        for (int i = 0; i < mega888List.Count; i++)
                //        {
                //            var RegisterRequest = new Mega888Request()
                //            {
                //                UserId = mega888List[i].UserId,
                //                UserName = mega888List[i].Username
                //            };
                //            var mega888result = await APICallPost(APIConst.baseUrl + APIConst.registerMega888, request: RegisterRequest);
                //            Console.WriteLine(mega888result);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (playtechList.Count > 0)
                //    {
                //        for (int i = 0; i < playtechList.Count; i++)
                //        {
                //            var RegisterRequest = new RegisterRequest()
                //            {
                //                GamePrefix = playtechList[i].Prefix,
                //                Name = playtechList[i].Name,
                //                Password = playtechList[i].Password,
                //                MobileNo = playtechList[i].Mobile,
                //                UserId = playtechList[i].UserId,
                //                Username = playtechList[i].Username
                //            };
                //            var playtechresult = await APICallPost(APIConst.baseUrl + APIConst.registerPlaytech, request: RegisterRequest);
                //            Console.WriteLine(playtechresult);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                //try
                //{
                //    if (kiss918List.Count > 0)
                //    {
                //        for (int i = 0; i < kiss918List.Count; i++)
                //        {
                //            var RegisterRequest = new RegisterRequest()
                //            {
                //                GamePrefix = kiss918List[i].Prefix,
                //                Name = kiss918List[i].Name,
                //                Password = kiss918List[i].Password,
                //                MobileNo = kiss918List[i].Mobile,
                //                UserId = kiss918List[i].UserId,
                //                Username = kiss918List[i].Username
                //            };
                //            var kiss918result = await APICallPost(APIConst.baseUrl + APIConst.register918kiss, request: RegisterRequest);
                //            Console.WriteLine(kiss918result);
                //        }
                //    }
                //}
                //catch (Exception ex)
                //{
                //    Console.WriteLine(ex.Message.ToString());
                //}

                try
                {
                    if (yeeBetList.Count > 0)
                    {
                        WriteTextToFile("Service recalled at " + DateTime.Now + " Yeebet Game || User Count--> " + yeeBetList.Count);
                        for (int i = 0; i < yeeBetList.Count; i++)
                        {
                            var model = new
                            {
                                Id = yeeBetList[i].UserId
                            };

                            var result = await APICallPost(APIConst.baseUrl + APIConst.registerYeeBet, request: model);
                            WriteTextToFile("Service recalled at " + DateTime.Now + " Yeebet Game || Game Username-> " + model.Id + " || Response-->" + JsonConvert.SerializeObject(result));
#if DEBUG
                            Console.WriteLine(result);
#endif
                        }
                    }
                }
                catch (Exception ex)
                {
                    WriteErrorTextToFile("Error :" + ex.Message);
#if DEBUG
                    Console.WriteLine(ex.Message.ToString());
#endif
                }

                try
                {
                    if (SBOList.Count > 0)
                    {
                        WriteTextToFile("Service recalled at " + DateTime.Now + " SBO Game || User Count--> " + SBOList.Count);
                        for (int i = 0; i < SBOList.Count; i++)
                        {
                            var model = new
                            {
                                Id = SBOList[i].UserId
                            };

                            var result = await APICallPost(APIConst.baseUrl + APIConst.RegisterSBO, request: model);
                            WriteTextToFile("Service recalled at " + DateTime.Now + " SBO Game || Game Username-> " + model.Id + " || Response-->" + JsonConvert.SerializeObject(result));
#if DEBUG
                            Console.WriteLine(result);
#endif
                        }
                    }
                }
                catch (Exception ex)
                {
                    WriteErrorTextToFile("Error :" + ex.Message);
#if DEBUG
                    Console.WriteLine(ex.Message.ToString());
#endif
                }

                try
                {
                    if (GamePlayList.Any())
                    {
                        foreach (var data in GamePlayList)
                        {
                            var model = new
                            {
                                Id = data.UserId
                            };

                            var result = await APICallPost(APIConst.baseUrl + APIConst.RegisterGamePlay, request: model);
#if DEBUG
                            Console.WriteLine(result);
#endif
                        }
                    }
                }
                catch (Exception ex)
                {
                    WriteErrorTextToFile("Error :" + ex.Message);
#if DEBUG
                    Console.WriteLine(ex.Message.ToString());
#endif
                }
            }
        }
    }
}