// @ts-check
import { test, expect } from "@playwright/test";
import { getEstoque } from "../estoque";

test.describe("estrutura do HTML", () => {
  test("deve ter o charset em UTF-8 no meta dentro do head", async ({
    page,
  }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page.locator("meta[charset]")).toHaveAttribute(
      "charset",
      "UTF-8"
    );
  });

  test('deve ter um meta viewport com atributo content com "width=device-width, initial-scale=1.0" no head', async ({
    page,
  }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1.0"
    );
  });

  test("deve ter o lang em pt no html", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("deve ter um título no head com o número da atividade e nome do aluno", async ({
    page,
  }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page).toHaveTitle(/DCC202 - Atividade 12: (.*)/);
  });

  test("deve ter um main com algum conteúdo", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page.locator("main")).toBeVisible();
  });

  test("deve ter um título no main com o nome do aluno", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    await expect(page.locator("main > h1")).toHaveText(
      /DCC202 - Atividade 12: (.*)/
    );
  });

  test("o main deve ter um parágrafo logo após o título", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const p = page.locator("main > h1+p");
    await expect(p).toBeVisible();
    await expect(p).toHaveText(
      "Esta é a página principal que usa JavaScript para adicionar iteração."
    );
  });

  test("Deve ter um script módulo na cabeça do documento para main.js.", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const script = page.locator("head > script");
    await expect(script).toHaveAttribute('src', 'main.js');
    await expect(script).toHaveAttribute('type', 'module');
  });

  test("deve ter um formulário com nome entrada", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const f = await page.locator("main > section> form");

    await expect(f).toBeAttached();
    await expect(f).toBeVisible();
    await expect(f).toHaveAttribute('name', 'entrada');
  });

  test("o form deve dois fieldset com legendas Origem e Destino", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const f = await page.locator("main > section > form");
    const fs = await f.locator("fieldset");
    await expect(fs).toHaveCount(2);
    console.log(fs[0]);
    const legend1 = page.locator('form>fieldset:nth-child(1)>legend');
    await expect(legend1).toHaveText('Origem');
    const legend2 = page.locator('form>fieldset:nth-child(2)>legend');
    await expect(legend2).toHaveText('Destino');
  });

  test("O primeiro fieldset deve ter três radios com valores para cada personagem'", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const radio1 = page.locator('fieldset:nth-child(1) > label:nth-child(2) > input[type=radio]');
    const radio2 = page.locator('fieldset:nth-child(1) > label:nth-child(3) > input[type=radio]');
    const radio3 = page.locator('fieldset:nth-child(1) > label:nth-child(4) > input[type=radio]');
    await expect(radio1).toHaveAttribute('name', 'origem');
    await expect(radio1).toHaveValue('pomar');

    await expect(radio2).toHaveAttribute('name', 'origem');
    await expect(radio2).toHaveValue('joao');

    await expect(radio3).toHaveAttribute('name', 'origem');
    await expect(radio3).toHaveValue('maria');

  });

  test("O segundo fieldset deve ter três radios com valores para cada personagem'", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const radio1 = page.locator('fieldset:nth-child(2) > label:nth-child(2) > input[type=radio]');
    const radio2 = page.locator('fieldset:nth-child(2) > label:nth-child(3) > input[type=radio]');
    const radio3 = page.locator('fieldset:nth-child(2) > label:nth-child(4) > input[type=radio]');
    await expect(radio1).toHaveAttribute('name', 'destino');
    await expect(radio1).toHaveValue('pomar');

    await expect(radio2).toHaveAttribute('name', 'destino');
    await expect(radio2).toHaveValue('joao');

    await expect(radio3).toHaveAttribute('name', 'destino');
    await expect(radio3).toHaveValue('maria');

  });

  test("Deve ter um select com três options para frutas'", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const select = page.locator('form  select');
    const option1 = page.locator('select > option:nth-child(1)');
    const option2 = page.locator('select > option:nth-child(2)');
    const option3 = page.locator('select > option:nth-child(3)');
    await expect(select).toBeAttached();
    await expect(select).toBeVisible();
    await expect(select).toHaveAttribute('name', 'fruta');

    await expect(option1).toHaveAttribute('value', 'maca');
    await expect(option1).toHaveText('Maçã');
    await expect(option2).toHaveAttribute('value', 'pera');
    await expect(option2).toHaveText('Pera');
    await expect(option3).toHaveAttribute('value', 'banana');
    await expect(option3).toHaveText('Banana');


  });

  test("Deve ter um campo para entrada de quantidades em número e com limites", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const input = await page.locator("input[type=number]");
    await expect(input).toHaveCount(1);
    await expect(input).toHaveAttribute('name', 'quantidade');
    await expect(input).toHaveAttribute('min', '0');
    await expect(input).toHaveAttribute('max', '12');
    await expect(input).toHaveAttribute('step', '1');
    await expect(input).toHaveValue('1');
  });



  test("Deve ter um botão para enviar", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const input = await page.locator("button[type=submit]");
    await expect(input).toHaveCount(1);
    await expect(input).toHaveText('Enviar');
  });


  test("Deve ter uma seção para saída", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const section = await page.locator("main > section#saida");
    await expect(section).toBeAttached();
    const h2Joao = await section.locator("h2:nth-child(1)");
    await expect(h2Joao).toBeVisible();
    await expect(h2Joao).toHaveText("João");
    const h2Maria = await section.locator("h2:nth-child(3)");
    await expect(h2Maria).toBeVisible();
    await expect(h2Maria).toHaveText("Maria");
  });

  test("Deve ter uma lista para cada pessoa com um id", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const olJoao = await page.locator("main > section#saida > ol#joao");
    await expect(olJoao).toBeAttached();
    const olMaria = await page.locator("main > section#saida > ol#maria");
    await expect(olMaria).toBeAttached();
  });

});

test.describe("comportamento", () => {

  test('João deve ser capaz de doar suas maçãs para maria', async ({ page }) => {
    await page.goto('http://localhost:5500/');
    await page.getByRole('button', { name: 'Limpar' }).click();
    await page.getByText('Pomar').first().click();
    await page.getByText('Maria').nth(1).click();
    await page.getByRole('spinbutton').fill('1');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByText('Pomar').first().click();
    await page.getByText('João').nth(1).click();
    await page.getByRole('spinbutton').fill('2');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByRole('group', { name: 'Origem' }).getByLabel('João').check();
    await page.getByRole('group', { name: 'Destino' }).getByLabel('Maria').check();
    await page.getByRole('spinbutton').dblclick();
    await page.getByRole('spinbutton').fill('2');
    await page.getByRole('button', { name: 'Enviar' }).click();
    const totalJoao = await page.getByText('maca: 0');
    await expect(totalJoao).toBeAttached();
    await expect(totalJoao).toBeVisible();
    await expect(totalJoao).toHaveText('maca: 0');

    const totalMaria = await page.getByText('maca: 3');
    await expect(totalMaria).toBeAttached();
    await expect(totalMaria).toBeVisible();
    await expect(totalMaria).toHaveText('maca: 3');
  });

  test('Maria deve ser capaz de doar suas maçãs e peras para joão', async ({ page }) => {
    await page.goto('http://localhost:5500/');
    await page.getByRole('button', { name: 'Limpar' }).click();
    await page.getByText('Pomar').first().click();
    await page.getByRole('group', { name: 'Destino' }).getByLabel('Maria').check();
    await page.getByRole('spinbutton').click();
    await page.getByRole('spinbutton').fill('3');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByText('Pomar').first().click();
    await page.getByText('Maria').nth(1).click();
    await page.getByRole('combobox').selectOption('pera');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByRole('group', { name: 'Origem' }).getByLabel('Maria').check();
    await page.getByText('João').nth(1).click();
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByRole('group', { name: 'Origem' }).getByLabel('Maria').check();
    await page.getByText('João').nth(1).click();
    await page.getByRole('combobox').selectOption('pera');
    await page.getByRole('button', { name: 'Enviar' }).click();
    await page.getByRole('group', { name: 'Origem' }).getByLabel('Maria').check();
    await page.getByRole('group', { name: 'Destino' }).getByLabel('João').check();
    await page.getByRole('combobox').selectOption('banana');
    await page.getByRole('button', { name: 'Enviar' }).click();

    const macasJoao = await page.locator('ol#joao > li:nth-child(1)');
    const perasJoao = await page.locator('ol#joao > li:nth-child(2)');
    await expect(macasJoao).toHaveText('maca: 1');
    await expect(perasJoao).toHaveText('pera: 1');

    const macasMaria = await page.locator('ol#maria > li:nth-child(1)');
    const perasMaria = await page.locator('ol#maria > li:nth-child(2)');
    await expect(macasMaria).toHaveText('maca: 2');
    await expect(perasMaria).toHaveText('pera: 0');
  });

  test("A lista deve ter o mesmo conteúdo inicial do estado com 1 e 2 maçãs para joão e maria", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const olJoao = await page.locator("main > section#saida > ol#joao");
    await expect(olJoao).toHaveText("maca: 1");
    const olMaria = await page.locator("main > section#saida > ol#maria");
    await expect(olMaria).toHaveText("maca: 2");
  });


  test("A lista deve ficar vazia ao clicar em 'Limpar Lista'", async ({ page }) => {
    await page.goto(`http://localhost:5500`);
    const liDeOlJoao = await page.locator("main > section#saida > ol#joao > li");
    await expect(liDeOlJoao).toHaveCount(1);
    await page.getByRole('button', { name: 'Limpar' }).click();
    await expect(liDeOlJoao).toHaveCount(0);
  });

});
