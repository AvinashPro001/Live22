using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.ServiceProcess;
using System.Threading.Tasks;
using Webet333.WindowsService.Model;
using Webet333.WindowsService.Model.Request;
using Webet333.WindowsService.Model.Response;

namespace Webet333.WindowsService
{
    public class RegisterService : ServiceBase
    {
        private static readonly HttpClient client = new HttpClient();

        public static string Token = string.Empty;
        static async Task<string> APICallPost(string Url, object request = null)
        {
            try
            {
                if (!string.IsNullOrEmpty(Token))
                {
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {Token}");
                }
                dynamic httpResponseMessage = client.PostAsJsonAsync(Url, request).Result;

                return await httpResponseMessage.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        static async Task<string> APICallGet(string Url)
        {
            try
            {
                var httpResponseMessage = client.GetAsync(Url).Result;
                return await httpResponseMessage.Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        public RegisterService()
        {
            CallRegisterGameAPIs();
        }

        public static async void CallRegisterGameAPIs()
        {
            var LoginRequest = new LoginRequest()
            {
                GrantType = GrantTypeEnums.admin,
                UserName = "CustomerService2",
                Password = "Abc@123"
            };

            var login_result = JsonConvert.DeserializeObject<LoginResponse>(await APICallPost(ApiConst.baseUrl + ApiConst.login, request: LoginRequest));
            Token = login_result.data.access_token;

            if (Token != null)
            {
                var userlist = JsonConvert.DeserializeObject<UserListResponse>(await APICallGet(ApiConst.baseUrl + ApiConst.nonRegisterUsers)).data;
                var agList = userlist.Where(x => x.GameName == "AG").ToList();
                var jokerList = userlist.Where(x => x.GameName == "JOKER").ToList();
                var m8List = userlist.Where(x => x.GameName == "M8").ToList();
                var maxbetList = userlist.Where(x => x.GameName == "MAXBET").ToList();
                var mega888List = userlist.Where(x => x.GameName == "MEGA888").ToList();
                var playtechList = userlist.Where(x => x.GameName == "PLAYTECH").ToList();
                var kiss918List = userlist.Where(x => x.GameName == "KISS918").ToList();

                try
                {
                    if (agList.Count > 0)
                    {
                        for (int i = 0; i < agList.Count; i++)
                        {
                            var RegisterRequest = new RegisterRequest()
                            {
                                GamePrefix = agList[i].Prefix,
                                Name = agList[i].Name,
                                Password = agList[i].Password,
                                MobileNo = agList[i].Mobile,
                                UserId = agList[i].UserId,
                                Username = agList[i].Username

                            };
                            var agresult = await APICallPost(ApiConst.baseUrl + ApiConst.registerAG, request: RegisterRequest);
                            Console.WriteLine(agresult);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }


                try
                {
                    if (m8List.Count > 0)
                    {
                        for (int i = 0; i < m8List.Count; i++)
                        {
                            var RegisterRequest = new RegisterRequest()
                            {
                                GamePrefix = m8List[i].Prefix,
                                Name = m8List[i].Name,
                                Password = m8List[i].Password,
                                MobileNo = m8List[i].Mobile,
                                UserId = m8List[i].UserId,
                                Username = m8List[i].Username

                            };
                            var m8result = await APICallPost(ApiConst.baseUrl + ApiConst.registerM8, request: RegisterRequest);
                            Console.WriteLine(m8result);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }

                try
                {
                    if (jokerList.Count > 0)
                    {
                        for (int i = 0; i < jokerList.Count; i++)
                        {
                            var RegisterRequest = new RegisterRequest()
                            {
                                GamePrefix = jokerList[i].Prefix,
                                Name = jokerList[i].Name,
                                Password = jokerList[i].Password,
                                MobileNo = jokerList[i].Mobile,
                                UserId = jokerList[i].UserId,
                                Username = jokerList[i].Username

                            };
                            var jokerresult = await APICallPost(ApiConst.baseUrl + ApiConst.registerJoker, request: RegisterRequest);
                            Console.WriteLine(jokerresult);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }

                try
                {
                    if (maxbetList.Count > 0)
                    {
                        for (int i = 0; i < maxbetList.Count; i++)
                        {
                            var RegisterRequest = new MaxBetRegister()
                            {
                                Currency = 2,
                                Custominfo1 = "",
                                Custominfo2 = "",
                                Custominfo3 = "",
                                Custominfo4 = "",
                                Custominfo5 = "",
                                Firstname = maxbetList[i].Name,
                                Lastname = "webet333",
                                maxtransfer = 9999999,
                                mintransfer = 1,
                                UserId = new Guid(maxbetList[i].UserId),
                                Username = maxbetList[i].Username

                            };
                            var maxresult = await APICallPost(ApiConst.baseUrl + ApiConst.registerMaxBet, request: RegisterRequest);
                            Console.WriteLine(maxresult);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }

                try
                {
                    if (mega888List.Count > 0)
                    {
                        for (int i = 0; i < mega888List.Count; i++)
                        {
                            var RegisterRequest = new Mega888Request()
                            {
                                UserId = mega888List[i].UserId,
                                UserName = mega888List[i].Username

                            };
                            var mega888result = await APICallPost(ApiConst.baseUrl + ApiConst.registerMega888, request: RegisterRequest);
                            Console.WriteLine(mega888result);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }

                try
                {
                    if (playtechList.Count > 0)
                    {
                        for (int i = 0; i < playtechList.Count; i++)
                        {
                            var RegisterRequest = new RegisterRequest()
                            {
                                GamePrefix = playtechList[i].Prefix,
                                Name = playtechList[i].Name,
                                Password = playtechList[i].Password,
                                MobileNo = playtechList[i].Mobile,
                                UserId = playtechList[i].UserId,
                                Username = playtechList[i].Username

                            };
                            var playtechresult = await APICallPost(ApiConst.baseUrl + ApiConst.registerPlaytech, request: RegisterRequest);
                            Console.WriteLine(playtechresult);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }

                try
                {
                    if (kiss918List.Count > 0)
                    {
                        for (int i = 0; i < kiss918List.Count; i++)
                        {
                            var RegisterRequest = new RegisterRequest()
                            {
                                GamePrefix = kiss918List[i].Prefix,
                                Name = kiss918List[i].Name,
                                Password = kiss918List[i].Password,
                                MobileNo = kiss918List[i].Mobile,
                                UserId = kiss918List[i].UserId,
                                Username = kiss918List[i].Username

                            };
                            var kiss918result = await APICallPost(ApiConst.baseUrl + ApiConst.register918kiss, request: RegisterRequest);
                            Console.WriteLine(kiss918result);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message.ToString());
                }
            }

        }
    }
}