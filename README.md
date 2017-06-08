# bAnalytics.js
##### V. Alpha1.0
bAnalytics.js é uma biblioteca javascript que facilita a criação e envio de eventos do Google Analytics customizados, além de trazer tratamentos / fallbacks para eventos que redirecionam para fora da página.

### Pré-requisitos

  - Snippet GA adicionado na página
  - jQuery
  - bAnalytics.js

### Iniciando bAnalytics
O parâmetro options não é obrigatório.
```
var options = { waitReady: true, debug: true };
bAnalytics.init(options);
```

##### Options disponíveis:
- [boolean] waitReady - Se deve esperar o document chegar no estado Ready para dar bind - default: true
- [boolean] unbind - Se deve dar unbind nos elementos - default: true
- [boolean] debug - Modo debug - default: false

### Definindo um elemento que deve criar um evento:
```
<a data-gaevent data-gacat="Social" data-gaact="Click" data-galbl="Facebook" href="https://www.facebook.com/w16.web/" taget="_blank">Facebook</a>
```

##### Atributos disponíveis:
- data-gaevent - Define que o elemento deve criar um evento
- data-gacat - Categoria do evento, se não especificado a categoria vira "CategoryNotSet" e tenta enviar Ação do evento como a classe do elemento e Label como o texto do elemento
- data-gaact - Ação do evento, se não especificado a ação vira "ActionNotSet"
- data-galbl - Label do evento, se não especificado a label vira "LabelNotSet"

### API
##### Rebind
```
bAnalytics.rebind(boolean unbind);
```
##### Toggle Debug
```
bAnalytics.toggle_debug(boolean debug);
```
##### Bind Element
```
bAnalytics.bind_element(jQuery element);
```
##### Set Time
```
bAnalytics.set_time(int time);
```
##### Set Event
```
bAnalytics.set_event(jQuery element, string category, string action, string label);
```
##### Initialize
```
bAnalytics.init(object options);
```