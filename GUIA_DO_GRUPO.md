# Guia do Grupo - CardioWatch

Este documento explica o estado atual do trabalho da Mostra Cultural, o processo completo e o que ainda precisa ser testado.

## 1. O que estamos construindo

O CardioWatch é um protótipo educacional de monitoramento de sinais cardíacos.

O sistema reúne:

- Arduino Uno.
- Sensor ECG AD8232.
- Sensor MAX30102 para BPM e SpO2.
- ESP8266 para comunicação Wi-Fi com ThingSpeak.
- Painel web CardioWatch para visualizar os dados.

O projeto serve para demonstrar a integração entre eletrônica, programação embarcada, comunicação Serial e desenvolvimento web.

O protótipo não é um equipamento médico e não deve ser usado para diagnóstico ou decisões de saúde.

## 2. Estado atual

A parte web está publicada e funcionando:

- Site: https://bathertz-cardiac-health-monitoring-site-j22ybl70f.vercel.app
- GitHub: https://github.com/0Iiver79/BatHertz
- Documentação geral: `README.md`

O painel já possui:

- Botão **Conectar Arduino**.
- Leitura pela porta USB usando Web Serial.
- Leitura de linhas no formato textual do Arduino.
- Leitura de dados em JSON.
- BPM e SpO2 recebidos do MAX30102.
- ECG recebido do AD8232 e desenhado no painel.
- Alertas para BPM e SpO2 fora dos limites.
- Modo **Simular** para apresentação sem o hardware.

## 3. Processo completo dos dados

```text
AD8232 + MAX30102
        |
        v
Arduino Uno
        |
        | USB / Serial - 9600 baud
        v
Chrome ou Edge
        |
        v
Painel CardioWatch na Vercel
```

O ESP8266 é uma alternativa para enviar os dados por Wi-Fi ao ThingSpeak. Para o primeiro teste do painel, deve-se usar o cabo USB do Arduino, pois é mais simples verificar o funcionamento.

## 4. Ligações principais

### AD8232

| AD8232 | Arduino Uno |
|---|---|
| 3.3V/VCC | 3.3V |
| GND | GND |
| OUTPUT | A0 |
| LO+ | D10 |
| LO- | D11 |

### MAX30102

| MAX30102 | Arduino Uno |
|---|---|
| VCC/VIN | Preferencialmente 3.3V |
| GND | GND |
| SDA | A4 |
| SCL | A5 |

### ESP8266 ESP-01

| ESP8266 | Arduino Uno |
|---|---|
| VCC | Fonte 3.3V externa estável |
| EN/CH_PD | 3.3V |
| GND | GND comum |
| TX | D2 |
| RX | D3 usando divisor de tensão |

O ESP8266 não deve receber 5 V no pino RX. A fonte 3.3 V do ESP8266 também deve suportar os picos de corrente do módulo.

## 5. Como testar o Arduino

1. Monte o circuito com a alimentação desligada.
2. Confira todas as ligações usando a tabela acima.
3. Instale na Arduino IDE as bibliotecas do MAX30102:
   - `MAX30105`.
   - `heartRate.h`, quando utilizada.
   - `spo2_algorithm.h`, quando utilizada.
4. Grave o código completo do Arduino.
5. Abra o Monitor Serial e confirme se o Arduino inicializa os sensores.
6. Verifique se a velocidade está em `9600 baud` no código completo.
7. Confira se aparecem linhas semelhantes a:

```text
ECG:512 | BPM:72 | SpO2:98%
```

8. Feche o Monitor Serial antes de abrir o site. A porta USB não pode ser usada ao mesmo tempo pela Arduino IDE e pelo navegador.

## 6. Como testar o site

1. Abra o site no Google Chrome ou Microsoft Edge.
2. Conecte o Arduino ao computador por USB.
3. Feche o Monitor Serial da Arduino IDE.
4. Clique em **Conectar Arduino** no cabeçalho.
5. Selecione a porta COM do Arduino.
6. Aguarde alguns segundos.
7. Coloque o dedo sobre o MAX30102, mantendo-o imóvel.
8. Coloque os eletrodos do AD8232 corretamente.
9. Observe o BPM, SpO2 e o traçado do ECG.
10. Para testar sem Arduino, use o botão **Simular**.

O navegador solicitará autorização para acessar a porta Serial. Essa autorização deve ser concedida manualmente.

## 7. Posicionamento dos eletrodos

No cabo de três vias:

- Vermelho/RA: parte superior direita do tórax.
- Amarelo/LA: parte superior esquerda do tórax.
- Verde/RL: parte inferior do tronco, como referência.

Não realizar testes com eletrodos enquanto o circuito estiver ligado a carregador ou fonte não isolada da rede elétrica.

## 8. O que cada integrante pode explicar

### Eletrônica

Explicar a protoboard, alimentação, GND comum e ligações dos sensores.

### AD8232

Explicar que ele mede uma variação elétrica do coração por meio dos eletrodos e envia um sinal analógico para A0.

### MAX30102

Explicar que ele usa luz vermelha e infravermelha para estimar BPM e SpO2.

### Arduino

Explicar que o Arduino lê os sensores, calcula os valores e envia as linhas pela porta Serial.

### ESP8266

Explicar que ele pode enviar os dados por Wi-Fi para o ThingSpeak usando comandos AT.

### Site

Explicar que o navegador recebe a Serial por USB, interpreta os dados e atualiza os cartões, alertas e gráfico ECG.

### Segurança e ética

Explicar que o projeto é uma demonstração educacional, não um dispositivo médico, e que dados pessoais e chaves de acesso não devem ser publicados.

## 9. O que ainda falta testar

- Confirmar se o MAX30102 utilizado aceita a tensão escolhida.
- Confirmar a alimentação externa correta do ESP8266.
- Testar o divisor de tensão do RX do ESP8266.
- Gravar o sketch no Arduino Uno.
- Confirmar que o Monitor Serial exibe dados sem erros.
- Confirmar a porta COM no Chrome ou Edge.
- Testar o botão **Conectar Arduino**.
- Conferir se o ECG aparece no gráfico.
- Conferir se BPM e SpO2 mudam conforme a leitura.
- Testar a situação de eletrodo desconectado.
- Testar o modo de simulação para a apresentação.
- Confirmar que não há senha Wi-Fi ou API Key real publicada no GitHub.

## 10. Limitações atuais

- O circuito atual não possui sensor de temperatura.
- O circuito atual não calcula frequência respiratória.
- O nome do paciente exibido no painel é demonstrativo.
- O ESP8266 e o ThingSpeak não são necessários para o primeiro teste por USB.
- O funcionamento real depende da qualidade da alimentação, dos eletrodos e do posicionamento do dedo.
- O painel não deve ser usado para diagnóstico médico.

## 11. Cuidados importantes

- Não usar uma LiPo de 3.7 V diretamente no pino 5V ou 3.3V do Arduino.
- Usar regulador apropriado para a tensão da placa.
- Não colocar 5 V no RX do ESP8266.
- Não conectar eletrodos durante o carregamento da bateria.
- Não usar pessoas como teste sem autorização e supervisão responsável.
- Interromper o teste em caso de desconforto, irritação ou aquecimento.
- Não publicar senhas, API Keys, nomes reais ou dados de saúde.

## 12. Como apresentar o projeto

Uma ordem simples para a apresentação:

1. Apresentar o problema e o objetivo do monitoramento.
2. Mostrar os componentes e a montagem.
3. Explicar o AD8232 e o MAX30102.
4. Mostrar o código e o formato enviado pela Serial.
5. Conectar o Arduino ao computador.
6. Abrir o painel e clicar em **Conectar Arduino**.
7. Mostrar BPM, SpO2 e ECG.
8. Explicar o modo de simulação como alternativa.
9. Apresentar as limitações e os cuidados de segurança.
10. Reforçar que o projeto é um protótipo educacional.

## 13. Checklist final do grupo

- [ ] Circuito conferido.
- [ ] Alimentação conferida.
- [ ] Bibliotecas instaladas.
- [ ] Sketch gravado no Arduino.
- [ ] Serial em 9600 baud funcionando.
- [ ] Monitor Serial fechado antes do teste web.
- [ ] Site aberto no Chrome ou Edge.
- [ ] Arduino conectado pelo botão do site.
- [ ] MAX30102 lendo o dedo.
- [ ] AD8232 com eletrodos posicionados.
- [ ] BPM e SpO2 exibidos.
- [ ] ECG aparecendo no gráfico.
- [ ] Modo Simular funcionando como plano alternativo.
- [ ] Nenhuma senha ou chave real publicada.
- [ ] Explicação de segurança preparada.
