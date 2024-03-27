/* no desafio o input deverá conseguir identificar qual o tipo de tecla o usuario está apertando. Caso a primeira tecla seja + ela deverá solicitar que o usuario adicione codigo de area internacional (caso seja brasil 55).
caso contrario a formatação deverá depender da quantidade de digitos. considerando DDD e DDI.
Caso o usuario digite letras as letras deverão ser convertidas para numeros utilizando o padrão numerico 2-9->abc-wxyz.
mesmo após convertido o numero ainda precisará ser reformulado em uma mascara.

aqui estão as combinações de mascara possiveis:

ddi -> pode ter de 1 a 3 digitos
ddd -> pode ter de 1 a 3 digitos
ramal -> pode ter de 1 a 3 digitos.

+000 (000) 0 0000-0000 -> ddi ddd celular -> 11 a 15 numeros
(000) 0 0000-0000 -> ddd celular -> 10 a 12 numeros
0 0000-0000 -> celular -> 9 numeros -> sempre será iniciado pelo numero 9

+000 (000) 0000-0000 000 -> ddi ddd telefone ramal -> 11 a 17 numeros
(000) 0000-0000 000 -> ddd telefone ramal -> 10 a 14 numeros
0000-0000 000 -> telefone ramal -> 9 a 11 numeros
0000-0000 -> telefone -> 8 numeros

0000 000 0000 -> telefone empresarial -> 11 numeros -> caracteristica especial apenas valida para numeros começados com 0 seguidos de um numero (geralmente 8)seguidos de 00
000 00 -> telefone empresarial 2 -> 3 a 5 numeros */