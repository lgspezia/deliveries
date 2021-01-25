export interface Settlement {
    id:             string;
    index:          number;
    guid:           string;
    picture:        string;
    name:           string;
    email:          string;
    phone:          string;
    address:        string;
    registered:     string;
    latitude:       string;
    longitude:      string;
    cidade:         string;
    banco:          string;
    tipoConta:      string;
    cpfCnpj:        string;

    agencia:        string;
    agenciaDv:      string;
    conta:          string;
    contaDv:        string;

    formaPgto:string;
    pago: boolean;
}
