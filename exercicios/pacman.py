import os
import random
import time
import msvcrt # Biblioteca nativa do Windows para detectar teclas sem Enter

# Configurações do Mapa (# = Parede, . = Ponto)
mapa_base = [
    "##########",
    "#........#",
    "#.###.##.#",
    "#.&......#",
    "#.####.#.#",
    "#....C...#",
    "#.##.###.#",
    "#.&......#",
    "##########"
]

# Transformar o mapa em matriz
mapa = [list(linha) for linha in mapa_base]

# Posição inicial
px, py = 5, 5 
fantasmas = [[1, 3], [7, 3]]
pontos = sum(linha.count('.') for linha in mapa_base)
jogando = True

def limpar_tela():
    os.system('cls' if os.name == 'nt' else 'clear')

def imprimir():
    limpar_tela()
    print("--- 🍕 PAC-MAN PYTHONIANO (VS CODE) 🍕 ---")
    print(f"Pontos restantes: {pontos}")
    for linha in mapa:
        print(" ".join(linha))
    print("------------------------------------------")
    print("Use: W, A, S, D para mover | Pressione Q para sair")

while jogando and pontos > 0:
    imprimir()
    
    # Captura a tecla sem precisar de Enter
    char = msvcrt.getch().decode('utf-8').lower()
    
    nx, ny = px, py
    if char == 'w': nx -= 1
    elif char == 's': nx += 1
    elif char == 'a': ny -= 1
    elif char == 'd': ny += 1
    elif char == 'q': break
    else: continue

    # Lógica de Movimento
    if mapa[nx][ny] != '#':
        if mapa[nx][ny] == '.':
            pontos -= 1
        
        if mapa[nx][ny] == '&':
            imprimir()
            print("\n💀 GAME OVER! O fantasma te pegou!")
            jogando = False
            break
            
        mapa[px][py] = ' '
        px, py = nx, ny
        mapa[px][py] = 'C'

        # Movimento dos Fantasmas
        for f in fantasmas:
            # Apaga o fantasma da posição atual (devolve o ponto se ele estava sobre um)
            mapa[f[0]][f[1]] = '.' 
            
            # Tenta mover
            dfx, dfy = random.choice([-1, 0, 1]), random.choice([-1, 0, 1])
            if mapa[f[0]+dfx][f[1]+dfy] != '#':
                f[0] += dfx
                f[1] += dfy
            
            # Se o fantasma pegar o C
            if f[0] == px and f[1] == py:
                imprimir()
                print("\n💀 GAME OVER! O fantasma te pegou!")
                jogando = False
            
            mapa[f[0]][f[1]] = '&'

if pontos == 0:
    imprimir()
    print("\n🏆 VITÓRIA! Você devorou todos os dados do mapa!")

print("\nFim de jogo. Pressione qualquer tecla para fechar...")
msvcrt.getch()
