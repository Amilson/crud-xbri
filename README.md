# CrudXbri

Projeto que contém crud e listagem de dados.

Foram utilizados os seguintes frameworks:

- Angular v18.
- ngrx para controle de estado.
- ngx-translate para internacionalização.
- ng-zorro para componentização e layout.
- ngx-mask para tratativas de mascáras.
- faker-js para massa de dados fictícios.
- eslint e prettier para padronização de código.
- playwrite para testes e2e.

### Disponibilidade

Foi realizado deploy na aws, acesso em: https://d2vhxty2io6ubi.cloudfront.net

### Estrutura do projeto

```
-- e2e -> aqui temos os testes e2e escritos com playwrite (teste de inicialização correta da app, teste de tradução, teste de listagem e teste de cadastro)
-- src
--- app
----- core -> contem pipes e utils
----- enums -> tipagem de enums
----- interfaces -> tipagem de interfaces
----- main -> contém as telas list e register (list para a listagem e register para o cadastro)
----- store -> código para o controle de estado da aplição
--- assets -> arquivos de img, icons, etc
```

### 1 - Formulário:

![Image](https://github.com/user-attachments/assets/e91fe8ea-c74b-424e-80c3-ab02a1b91fb7)

Nesta foram criados os campos de cadastro, sendo eles:

```
name: string;
category: string;
quantity: number;
price: number;
status: boolean;
```

Tratativas de erro:
![Image](https://github.com/user-attachments/assets/710d668b-21f7-4bda-884a-f4adbbb1df61)

### 2 - Listagem:

![Image](https://github.com/user-attachments/assets/7b0a8950-acc6-4e55-a922-4cffe9e8653b)

- possibilidade de seleção multipla para deleção.
- toggle com ação rápida para alterar o status (Ativo/Inativo).
- ações de - Editar - Deletar -
- pesquisa

### 2 - Listagem - Pesquisa:

É possível pesquisar pelos campos que foram inseridos, a pesquisa é feita com operador OU

![Image](https://github.com/user-attachments/assets/4def0aee-e2fb-45c8-a5ea-72564f0012b3)

### 3 - Internacionalização:

![Image](https://github.com/user-attachments/assets/90e55db1-c16c-4c3b-83c4-a80000098530)
![Image](https://github.com/user-attachments/assets/691858de-9300-4fe7-b109-2e6c60afeb45)

### 4 - Extra 1

- Opção para exibir um sumário

![Image](https://github.com/user-attachments/assets/10303c8a-59f3-4ed7-9fc9-dd3f80a675ae)
![Image](https://github.com/user-attachments/assets/47b5d362-fbc8-4e34-9ad0-a01929d1fbbc)

```
qtd: number -> quantidade total de items
qtdActives: number; -> quantidade total de items ativos
qtdInactives: number; -> quantidade total de items inativos
sumQtdActives: number; -> somatória do campo quantity de todos os items ativos
averageActives: number; -> percentual que a quantidade de itens ativos representa no geral
averageInactives: number; -> percentual que a quantidade de itens inativos representa no geral
sumQtdInactives: number; -> somatória do campo quantity de todos os items inativos
```

### 5 - Extra 2

- Opção para gerar massa de dados

![Image](https://github.com/user-attachments/assets/f3b89a07-2a2e-4d84-98be-c66efabdbaa6)

Esta opção cadastra 2.000 registros com dados randômicos

### 6 - Extra 3

- Testes e2e com playwrite

Foi criada uma estrutura básica onde é possível garantir o teste de integração para alguns casos, são eles:

![Image](https://github.com/user-attachments/assets/87eb7c0f-a7f8-4cbc-9ec0-402823730877)

- teste para conferência de a app esta inicializando corretamente.
- teste para conferência se as traduções estão sendo carregadas corretamente.
- teste para conferência da listagem.
- teste para conferência se o cadastro esta acontecendo corretamente.

Cada um destes testes foram executados no Chrome, Firefox e Safari.

![Image](https://github.com/user-attachments/assets/829240f2-73f1-4a1d-a82e-3c0c2bd35d06)

Video com o teste rodando

<video src="https://github.com/user-attachments/assets/ebb3eacb-cdf5-4ab3-95dc-a3704825da2d
" controls="controls" style="max-width: 100%; height: auto;">
Your browser does not support the video tag.
</video>
