import m from "mithril";


let texto = {
    estado: "",
    setValue: function(v) {
        texto.estado = v
    },
    view: function() {
        return [
            m('fieldset', [
                    m("legend","Texto Plano"),
                    m('label','Texto'),
                    m('input[type=text]',{
                        value: texto.estado,
                        oninput: m.withAttr('value', texto.setValue)
                    })]),
            m(cesar,{valor: texto.estado})
        ]
    }
}


var cesar = {
    alfabeto: "aábcdeéfghiíklmnñoópqrstuvwxyz".split(''),
    desplazamiento: "",
    setValue: function(v) {
        cesar.desplazamiento = v},
    cifrado: function(texto) {
        var posicion = function( char ) {return cesar.alfabeto.indexOf( char );}
        let salida = ''
        if( cesar.desplazamiento != "" ) {
            texto.split('').forEach( function( item ) {
                salida += cesar.alfabeto.includes( item ) 
                ? cesar.alfabeto[ (posicion(item)+ parseInt(cesar.desplazamiento,10)%cesar.alfabeto.length) ]
                : item
            })
        } else return texto
        return salida
    },
    view: function(vnode) {
        return m('div', [
            m('fieldset',[
                    m("legend","Cifrado Cesar"),
                    m('div',  
                        m('label','Desplazamiento'),
                        m('input[type=number]', {
                            value: cesar.desplazamiento,
                            oninput: m.withAttr('value', cesar.setValue)
                        })),
                    m('textarea',{
                        value: cesar.cifrado(vnode.attrs.valor)
                    }),
                ]),
            m(inverso, { cifrado: cesar.cifrado(vnode.attrs.valor) }),
            m(grupos, { plano: vnode.attrs.valor} )
            
        ])
    }
}

var inverso = {
    estado: "",
    rev: function(texto) {
        inverso.estado = texto.split('').reverse().join('')
        return inverso.estado
    },
    view: function(vnode) {
        return m('div',
                m('fieldset',[
                     m("legend","Transpocision Inversa"),
                     m('textarea',{
                        value: inverso.rev( vnode.attrs.cifrado )
                     })
                ]))
    }
}

var grupos = {
    estado: "",
    grupo: "",
    textoEnGrupos: "",
    indice: 0,
    setValue: function(v){grupos.grupo = v},
    agrupar: function(texto) {
        if( grupos.grupo != "" ) {
            grupos.estado =""
            grupos.indice = 0
            grupos.textoEnGrupos= ""
            if(texto.length<grupos.grupo)
                return texto

            while(grupos.indice < texto.length){
                if((grupos.indice+1) % grupos.grupo === 0){
                    grupos.textoEnGrupos += texto[grupos.indice]
                    grupos.estado += grupos.textoEnGrupos.split('').reverse().join('')
                    grupos.textoEnGrupos= "" 
                }else  grupos.textoEnGrupos += texto[grupos.indice]        
                
                grupos.indice++
            }
               grupos.estado += grupos.textoEnGrupos
        return grupos.estado
            }else return texto
    },
    view: function(vnode) {
        return m('div',
                m('fieldset',[
                        m('legend','Transpocision Inversa en Grupos'),
                        m('label','Grupos de'),
                        m('input[type=number]', {
                            value: grupos.grupo,
                            oninput: m.withAttr('value', grupos.setValue)
                        }),
                        m('div',
                            m('textarea',{
                            value: grupos.agrupar( vnode.attrs.plano ) 
                        }))
                    ])
            )
    }
}

let Form = {
    view: function() {
        return m("form",
            m(texto))
    }
}

m.mount( document.body, Form )