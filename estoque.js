let estoque = {
    'joao': {
        'maca': 1,
        'banana': 2
    },
    'maria':{
        'maca':2,
        'pera': 3
    }
};

function getEstoque(){
    return structuredClone(estoque);
}

export {getEstoque};