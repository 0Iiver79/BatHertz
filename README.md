# BatHerz - Monitoramento Cardíaco

Projeto desenvolvido para a Mostra Cultural com finalidade educacional. O sistema demonstra como sensores podem coletar sinais cardíacos e como um painel web pode apresentar esses dados.

> **Importante:** este projeto é um protótipo didático. Não é equipamento médico, não substitui avaliação profissional e não deve ser usado para decisões clínicas.

## Atualização do Projeto

O projeto possui duas partes:

1. **Arduino e sensores:** coleta dados do AD8232 e do MAX30102.
2. **BatHerz:** painel web publicado na Vercel que pode receber dados pela porta USB do Arduino.

Site publicado:

<https://bathertz-cardiac-health-monitoring-site-j22ybl70f.vercel.app>

Repositório:

<https://github.com/0Iiver79/BatHertz>

## Objetivos

- Demonstrar a leitura de sinais de um sensor ECG.
- Demonstrar a leitura de frequência cardíaca e SpO2.
- Exibir dados em uma interface web.
- Relacionar eletrônica, programação, comunicação Serial e Internet das Coisas.
- Discutir limites, segurança e responsabilidade no uso de dados biométricos.

## Componentes

- Arduino Uno R3.
- Protoboard 4x6.
- Jumpers.
- Sensor ECG AD8232.
- Sensor de pulso e oxímetro MAX30102.
- Módulo Wi-Fi ESP8266.
- Bateria LiPo de 3.7 V, somente com circuito de alimentação adequado.
- Eletrodos descartáveis e cabo compatível com o AD8232.
- Computador com navegador Chrome ou Edge para a conexão USB.

## Ligações

### AD8232

| AD8232 | Arduino Uno |
|---|---|
| 3.3V/VCC | 3.3V |
| GND | GND |
| OUTPUT/OUT | A0 |
| LO+ | D10 |
| LO- | D11 |

### MAX30102

| MAX30102 | Arduino Uno |
|---|---|
| VCC/VIN | Preferencialmente 3.3V |
| GND | GND |
| SDA | A4 |
| SCL | A5 |
| INT | Opcional; não utilizado no código básico |

A tensão correta depende do modelo do módulo MAX30102. Não aplicar 5 V sem confirmar que a placa possui regulador e conversão de nível.

### ESP8266 ESP-01

| ESP8266 | Arduino Uno |
|---|---|
| VCC | Fonte 3.3V externa e estável |
| CH_PD/EN | 3.3V |
| GND | GND comum |
| TX | D2, RX do SoftwareSerial |
| RX | D3, TX do SoftwareSerial através de divisor de tensão |

O ESP8266 pode exigir picos de corrente maiores que o regulador 3.3 V do Arduino Uno consegue fornecer. Use uma fonte 3.3 V apropriada.

## Posicionamento dos eletrodos

No padrão IEC usado pelo cabo de três vias:

- **Vermelho/RA:** parte superior direita do tórax, abaixo da clavícula.
- **Amarelo/LA:** parte superior esquerda do tórax, abaixo da clavícula.
- **Verde/RL:** parte inferior do tronco, usado como referência.

A montagem deve ser feita por adultos responsáveis e com atenção às orientações de segurança. Não utilizar eletrodos durante o carregamento da bateria ou com fontes não isoladas ligadas à rede elétrica.

## Como os dados percorrem o sistema

```text
AD8232 e MAX30102
        |
        v
Arduino Uno
        |
        | USB / Serial em 9600 baud
        v
Navegador Chrome ou Edge
        |
        v
Painel BatHerz na Vercel
```

O Arduino pode enviar linhas como:

```text
ECG:512 | BPM:72 | SpO2:98%
```

O painel também aceita JSON:

```json
{"ecg":512,"heartRate":72,"spo2":98}
```

## Como testar o painel

1. Grave o sketch do Arduino.
2. Conecte os sensores e confira a alimentação.
3. Conecte o Arduino ao computador por USB.
4. Feche o Monitor Serial da Arduino IDE, pois somente um programa pode usar a porta ao mesmo tempo.
5. Abra o site no Chrome ou Edge.
6. Clique em **Conectar Arduino**.
7. Selecione a porta COM do Arduino.
8. Posicione o dedo no MAX30102 e os eletrodos no AD8232.
9. Aguarde alguns segundos para estabilizar as leituras.

Sem Arduino conectado, o botão **Simular** permite demonstrar o funcionamento visual do painel. Com o Arduino conectado, a simulação é desativada.

## O que o painel mostra

- ECG recebido pela USB quando houver amostras do AD8232.
- Frequência cardíaca em BPM.
- Saturação de oxigênio em SpO2.
- Histórico visual dos dados.
- Alertas de valores fora dos limites definidos no protótipo.
- Contatos de emergência demonstrativos.
- Modo de simulação para apresentação.

O protótipo não recebe temperatura nem frequência respiratória dos sensores atuais. Durante a conexão do Arduino, esses campos aparecem sem leitura quando não há dados reais.

## Bibliotecas do Arduino

O sketch precisa das bibliotecas compatíveis com o hardware utilizado, especialmente:

- `Wire`.
- `MAX30105`.
- `heartRate.h`, quando usado o algoritmo de BPM.
- `spo2_algorithm.h`, quando usado o cálculo de SpO2.
- `SoftwareSerial`, quando o ESP8266 for utilizado por comandos AT.

As bibliotecas devem ser instaladas pela Arduino IDE antes da compilação.

## Limitações conhecidas

- O navegador precisa permitir acesso à porta Serial.
- Web Serial funciona principalmente em Chrome e Edge.
- O site não possui cadastro real de pacientes; o nome exibido é demonstrativo.
- O projeto não armazena prontuários nem dados clínicos.
- O ThingSpeak é opcional para uma futura versão via Wi-Fi; o site funciona sem API externa usando USB/Web Serial.
- O cálculo de BPM e SpO2 depende do posicionamento dos sensores, ruído elétrico e qualidade do sinal.
- O Arduino Uno possui limitações de memória e comunicação Serial.

## Segurança e privacidade

- Nunca publicar senha de Wi-Fi ou chave de escrita do ThingSpeak no GitHub.
- Usar somente dados fictícios durante a apresentação pública.
- Não divulgar nome, telefone ou informação de saúde de pessoas reais.
- Não alimentar o circuito de forma improvisada enquanto houver contato com o corpo.
- Não apresentar as leituras como diagnóstico médico.
- Interromper o teste se houver desconforto, irritação ou aquecimento anormal do circuito.

## Tecnologias do painel

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Web Serial API.
- Vercel.

Comandos locais, executados dentro de `Cardiac Health Monitoring Site`:

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Divisão sugerida para a apresentação

- **Eletrônica:** montagem da protoboard, alimentação e pinagem.
- **Sensores:** funcionamento do AD8232 e do MAX30102.
- **Programação embarcada:** leitura, cálculo e envio Serial.
- **Interface:** painel BatHerz e visualização dos dados.
- **Comunicação:** USB, ESP8266, ThingSpeak e Vercel.
- **Responsabilidade:** segurança elétrica, privacidade e limites médicos.

## Conclusão

O BatHerz mostra um fluxo completo de prototipagem: o sensor coleta dados, o Arduino processa as leituras, a comunicação Serial transporta os valores e o painel web apresenta as informações. O resultado deve ser tratado como uma demonstração educacional de tecnologia, e não como um dispositivo médico.
