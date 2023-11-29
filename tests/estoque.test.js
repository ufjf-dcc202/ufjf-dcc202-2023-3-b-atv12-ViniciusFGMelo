import { expect, test } from 'vitest';
import { getEstoque, limpaEstoque, transacaoNoEstoque } from '../estoque.js';

test('Deve ter uma função getEstoque() exportada no módulo estoque', () => {
  expect(getEstoque).toBeTypeOf('function');
});

test('Deve ter uma função transacaoNoEstoque() exportada no módulo', () => {
  expect(transacaoNoEstoque).toBeTypeOf('function');
});


test('Deve ter uma função limpaEstoque() exportada no módulo', () => {
  expect(limpaEstoque).toBeTypeOf('function');
});

test('O estoque deve começar três maçãs no total', () => {
  const estoque = getEstoque();
  expect(estoque['joao']).toBeTypeOf('object');
  expect(estoque['maria']).toBeTypeOf('object');
  expect(estoque['joao']).toHaveLength(1);
  expect(estoque['maria']).toHaveLength(1);
  expect(estoque['maria'][0].tipo).toBe('maca');
  expect(estoque['maria'][0].quantidade).toBe(2);
  expect(estoque['joao'][0].tipo).toBe('maca');
  expect(estoque['joao'][0].quantidade).toBe(1);

});

test('O estoque deve estar vazio depois de chamar limpaEstoque()', () => {
  let estoque = getEstoque();
  limpaEstoque();
  estoque = getEstoque();
  console.log(Object.keys(estoque));
  expect(Object.keys(estoque)).toHaveLength(0);
});

test('O pomar sempre tem as frutas', () => {
  limpaEstoque();
  transacaoNoEstoque('pomar', 'maria', 'maca', 1);
  let estoque = getEstoque();
  expect(estoque['maria']).toBeDefined();
  expect(estoque['maria'][0].tipo).toBe("maca");
  expect(estoque['maria'][0].quantidade).toBe(1);
});

test('O pomar sempre recebe as frutas', () => {
  limpaEstoque();
  transacaoNoEstoque('pomar', 'maria', 'maca', 1);
  let estoque = getEstoque();
  expect(estoque['maria']).toBeDefined();
  expect(estoque['maria'][0].tipo).toBe("maca");
  expect(estoque['maria'][0].quantidade).toBe(1);
  transacaoNoEstoque('maria', 'pomar', 'maca', 5);
  estoque = getEstoque();
  expect(estoque['maria']).toBeDefined();
  expect(estoque['maria'][0].tipo).toBe("maca");
  expect(estoque['maria'][0].quantidade).toBe(0);
  expect(estoque['pomar']).toBeUndefined();

});

test('A transação e uma pessoa para outra deve ter o total das quantidades de mesma frota', () => {
  limpaEstoque();
  transacaoNoEstoque('pomar', 'maria', 'maca', 2);
  transacaoNoEstoque('pomar', 'joao', 'maca', 1);
  let estoque = getEstoque();
  expect(estoque['maria'][0].tipo).toBe("maca");
  expect(estoque['maria'][0].quantidade).toBe(2);
  expect(estoque['joao']).toBeDefined();
  expect(estoque['joao'][0].tipo).toBe("maca");
  expect(estoque['joao'][0].quantidade).toBe(1);
  transacaoNoEstoque('joao', 'maria', 'maca', 1);
  estoque = getEstoque();
  expect(estoque['maria'][0].quantidade).toBe(3);
  expect(estoque['joao'][0].quantidade).toBe(0);
});

test('A transação e uma pessoa para outra deve ter o total das quantidades de mesma frota', () => {
  limpaEstoque();
  transacaoNoEstoque('pomar', 'maria', 'maca', 2);
  transacaoNoEstoque('pomar', 'maria', 'banana', 1);
  transacaoNoEstoque('pomar', 'joao', 'maca', 1);
  let estoque = getEstoque();
  expect(estoque['maria'][0].tipo).toBe("maca");
  expect(estoque['maria'][0].quantidade).toBe(2);
  expect(estoque['maria'][1].tipo).toBe("banana");
  expect(estoque['maria'][1].quantidade).toBe(1);
  expect(estoque['joao'][0].tipo).toBe("maca");
  expect(estoque['joao'][0].quantidade).toBe(1);
  transacaoNoEstoque('maria', 'joao', 'banana', 2);
  estoque = getEstoque();
  expect(estoque['maria'][0].quantidade).toBe(2);
  expect(estoque['maria'][1].quantidade).toBe(0);
  expect(estoque['joao'][0].quantidade).toBe(1);
  expect(estoque['joao'][1].tipo).toBe('banana');
  expect(estoque['joao'][1].quantidade).toBe(1);
});
