var AGbaseUrl = "http://agent.avx99.com/API/";

var AGConstParameter = {
    VendorID: "vendor_id=jdWvhb3sj83fhv33",
    OperatorID: "operator_id=WB"
};

var AGcurrencyListConst = {
    MYR: "currency=MYR", //Malaysia 
    CNY: "currency=CNY", //China 
    IDR: "currency=IDR", //Indonesia
    VND: "currency=VND", //Vietnam 
    THB: "currency=THB"  //Thailand
};

var AGOddTypeConst = {
    A: "odd_type=A", //(20~50000)
    B: "odd_type=B", //(50~5000)
    C: "odd_type=C", //(20~10000)
    D: "odd_type=D", //(200~20000)
    E: "odd_type=E", //(300~30000)
    F: "odd_type=F", //(400~40000)
    G: "odd_type=G", //(500~50000)
    H: "odd_type=H", //(1000~100000)
    I: "odd_type=I"  //(2000~200000)
};

var AGTransferCreditConst = {
    deposit: "type=IN",
    withdraw: "type=OUT"
};

var AGActionConst = {
    CraeteAccount: "CheckOrCreateGameAccout?",
    TransferCredit: "TransferCredit?",
    GetBalance: "GetBalance?",
    ForwadGame:"forwardGame"
};