
	var i;
	var j;
	
	document.getElementById("pve").onclick = function () {
		
		localStorage.setItem('pl',0);
	}
	
	document.getElementById("pvp").onclick = function () {
		
		localStorage.setItem('pl', 1);
	}
	
var Qi = new Array();

for (i = 0; i < 15; i++) {
	
	Qi[i] = new Array();
}

for (i = 0; i < 15; i++) {
	
	for (j = 0; j < 15; j++) {
		
		Qi[i].push(' ');
	}
}

function valid_move(i, j) {
    
		console.log("call valid_move()");
		
        if (i >= 0 && i <= 14 && j >= 0 && j <= 14 && Qi[i][j] == ' ') return true;
        
        return false;
}

function move(i, j, c) {
        
		console.log("call move()");
		
        if (i < 0 || i > 14|| j < 0 || j > 14) return false;
        
        if (Qi[i][j] != ' ') return false;
        
        Qi[i][j] = c;
        
        //System.out.println(i + ", " + j);
        
        return true;
}

function win() {
    
		console.log("call win()");
		
		for (var i = 0; i < 15; i++) {
        
            for (var j = 0; j < 15; j++) {
            
                if (Qi[i][j] != ' ') {
                
                    var c = Qi[i][j];
                    
                    if (i <= 10 && j <= 10 
                            && Qi[i + 1][j + 1] == c && Qi[i + 2][j + 2] == c && Qi[i + 3][j + 3] == c && Qi[i + 4][j + 4] == c) return true;
                    
                    else if (i <= 10 && j >= 4 && j <= 14  
                            && Qi[i + 1][j - 1] == c && Qi[i + 2][j - 2] == c && Qi[i + 3][j - 3] == c && Qi[i + 4][j - 4] == c) return true;
                    
                    else if (j <= 10
                            && Qi[i][j + 1] == c && Qi[i][j + 2] == c && Qi[i][j + 3] == c && Qi[i][j + 4] == c) return true;
                    
                    else if (i <= 10
                            && Qi[i + 1][j] == c && Qi[i + 2][j] == c && Qi[i + 3][j] == c && Qi[i + 4][j] == c) return true;
                    
                }
            }
        }
        
        return false;
    }
	
	//连续请求空位（包括位置i, j）
    function space(i, j, angle, num) {
    
        if (angle == 0) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || Qi[i+k][j] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 45) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || j-k < 0 || j-k > 14 || Qi[i+k][j-k] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 90) {
        
            for (var k = 0; k < num; k++) {
            
                if (j+k < 0 || j+k > 14 || Qi[i][j+k] != ' ') return false;
            }
            return true;
        }
        
        if (angle == 135) {
        
            for (var k = 0; k < num; k++) {
            
                if (i+k < 0 || i+k > 14 || j+k < 0 || j+k > 14 || Qi[i+k][j+k] != ' ') return false;
            }
            return true;
        }
        
        return false;
    }
    
    function value_0(i, j) {
    
		//console.log("call value_0()");
        //一连
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+1, j, 0, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 4)) return 0;
                return 0;
            }
            
            //活一 +5
            if ((space(i-4, j, 0, 4) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 3) && space(i+1, j, 0, 2)) 
                    || (space(i-2, j, 0, 2) && space(i+1, j, 0, 3)) || (space(i-1, j, 0, 1) && space(i+1, j, 0, 4))) 
                return 1;
            //活一 +4
            if ((space(i-3, j, 0, 3) && space(i+1, j, 0, 1)) || (space(i-2, j, 0, 2) && space(i+1, j, 0, 2)) 
                    || (space(i-1, j, 0, 1) && space(i+1, j, 0, 3)))
                return 0;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+2, j, 0, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-3, j, 0, 3) && space(i+2, j, 0, 1)) || (space(i-2, j, 0, 2) && space(i+2, j, 0, 2)) 
                    || (space(i-1, j, 0, 1) && space(i+2, j, 0, 3))) return 5;
            //活二 +3
            if ((space(i-2, j, 0, 2) && space(i+2, j, 0, 1)) || (space(i-1, j, 0, 1) && space(i+2, j, 0, 2)))
                return 3;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+1, j, 0, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-4, j, 0, 3) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 2) && space(i+1, j, 0, 2)) 
                    || (space(i-2, j, 0, 1) && space(i+1, j, 0, 3))) return 5;
            //活二 +3
            if ((space(i-3, j, 0, 2) && space(i+1, j, 0, 1)) || (space(i-2, j, 0, 1) && space(i+1, j, 0, 2)))
                return 3;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && i+2 < 15 && Qi[i+2][j] == Qi[i][j] 
            && (i+3 > 14 || Qi[i+3][j] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+3 > 14 || Qi[i+3][j] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+3, j, 0, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+3 > 14 || Qi[i+3][j] != ' ') {
            
                if (space(i-2, j, 0, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j, 0, 2) && space(i+3, j, 0, 1)) || (space(i-1, j, 0, 1) && space(i+3, j, 0, 2))) return 9;
            //活三 +2
            if (space(i-1, j, 0, 1) && space(i+3, j, 0, 1)) return 5;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && i+1 < 15 && Qi[i+1][j] == Qi[i][j] 
            && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+2, j, 0, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j, 0, 2) && space(i+2, j, 0, 1)) || (space(i-2, j, 0, 1) && space(i+2, j, 0, 2))) return 9;
            //活三 +2
            if (space(i-2, j, 0, 1) && space(i+2, j, 0, 1)) return 5;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || Qi[i-3][j] != Qi[i][j]) && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] 
            && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || Qi[i-3][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || Qi[i-3][j] != ' ') {
            
                if (space(i+1, j, 0, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j, 0, 2) && space(i+1, j, 0, 1)) || (space(i-3, j, 0, 1) && space(i+1, j, 0, 2))) return 9;
            //活三 +2
            if (space(i-3, j, 0, 1) && space(i+1, j, 0, 1)) return 5;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || Qi[i-1][j] != Qi[i][j]) && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && i+2 < 15 && Qi[i+2][j] == Qi[i][j] 
            && i+3 < 15 && Qi[i+3][j] == Qi[i][j] && (i+4 > 14 || Qi[i+4][j] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || Qi[i-1][j] != ' ') && (i+4 > 14 || Qi[i+4][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || Qi[i-1][j] != ' ') {
            
                if (space(i+4, j, 0, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+4 > 14 || Qi[i+4][j] != ' ') {
            
                if (space(i-1, j, 0, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j, 0, 1) && space(i+4, j, 0, 1)) return 1000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || Qi[i-2][j] != Qi[i][j]) && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && i+1 < 15 && Qi[i+1][j] == Qi[i][j] 
            && i+2 < 15 && Qi[i+2][j] == Qi[i][j] && (i+3 > 14 || Qi[i+3][j] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || Qi[i-2][j] != ' ') && (i+3 > 14 || Qi[i+3][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || Qi[i-2][j] != ' ') {
            
                if (space(i+3, j, 0, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+3 > 14 || Qi[i+3][j] != ' ') {
            
                if (space(i-2, j, 0, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j, 0, 1) && space(i+3, j, 0, 1)) return 1000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || Qi[i-3][j] != Qi[i][j]) && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] 
            && i+1 < 15 && Qi[i+1][j] == Qi[i][j] && (i+2 > 14 || Qi[i+2][j] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || Qi[i-3][j] != ' ') && (i+2 > 14 || Qi[i+2][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || Qi[i-3][j] != ' ') {
            
                if (space(i+2, j, 0, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+2 > 14 || Qi[i+2][j] != ' ') {
            
                if (space(i-3, j, 0, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j, 0, 1) && space(i+2, j, 0, 1)) return 1000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || Qi[i-4][j] != Qi[i][j]) && i-3 >= 0 && Qi[i-3][j] == Qi[i][j] && i-2 >= 0 && Qi[i-2][j] == Qi[i][j] 
            && i-1 >= 0 && Qi[i-1][j] == Qi[i][j] && (i+1 > 14 || Qi[i+1][j] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || Qi[i-4][j] != ' ') && (i+1 > 14 || Qi[i+1][j] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || Qi[i-4][j] != ' ') {
            
                if (space(i+1, j, 0, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+1 > 14 || Qi[i+1][j] != ' ') {
            
                if (space(i-4, j, 0, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j, 0, 1) && space(i+1, j, 0, 1)) return 1000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_45(i, j) {
    
		//console.log("call value_45()");
		
        //一连
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+1, j-1, 45, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 4)) return 0;
                return 0;
            }
            
            //活一 +5
            if ((space(i-4, j+4, 45, 4) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 3) && space(i+1, j-1, 45, 2)) 
                    || (space(i-2, j+2, 45, 2) && space(i+1, j-1, 45, 3)) || (space(i-1, j+1, 45, 1) && space(i+1, j-1, 45, 4))) 
                return 1;
            //活一 +4
            if ((space(i-3, j+3, 45, 3) && space(i+1, j-1, 45, 1)) || (space(i-2, j+2, 45, 2) && space(i+1, j-1, 45, 2)) 
                    || (space(i-1, j+1, 45, 1) && space(i+1, j-1, 45, 3)))
                return 0;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] 
                && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+2, j-2, 45, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-3, j+3, 45, 3) && space(i+2, j-2, 45, 1)) || (space(i-2, j+2, 45, 2) && space(i+2, j-2, 45, 2)) 
                    || (space(i-1, j+1, 45, 1) && space(i+2, j-2, 45, 3))) return 5;
            //活二 +3
            if ((space(i-2, j+2, 45, 2) && space(i+2, j-2, 45, 1)) || (space(i-1, j+1, 45, 1) && space(i+2, j-2, 45, 2)))
                return 3;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] 
                && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+1, j-1, 45, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-4, j+4, 45, 3) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 2) && space(i+1, j-1, 45, 2)) 
                    || (space(i-2, j+2, 45, 1) && space(i+1, j-1, 45, 3))) return 5;
            //活二 +3
            if ((space(i-3, j+3, 45, 2) && space(i+1, j-1, 45, 1)) || (space(i-2, j+2, 45, 1) && space(i+1, j-1, 45, 2)))
                return 3;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] 
                && i+2 < 15 && j-2 >= 0 && Qi[i+2][j-2] == Qi[i][j] && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+3, j-3, 45, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ') {
            
                if (space(i-2, j+2, 45, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j+2, 45, 2) && space(i+3, j-3, 45, 1)) || (space(i-1, j+1, 45, 1) && space(i+3, j-3, 45, 2))) return 9;
            //活三 +2
            if (space(i-1, j+1, 45, 1) && space(i+3, j-3, 45, 1)) return 5;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] 
                && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+2, j-2, 45, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j+3, 45, 2) && space(i+2, j-2, 45, 1)) || (space(i-2, j+2, 45, 1) && space(i+2, j-2, 45, 2))) return 9;
            //活三 +2
            if (space(i-2, j+2, 45, 1) && space(i+2, j-2, 45, 1)) return 5;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != Qi[i][j]) && i-2 >= 0 && j+2 < 15 && Qi[i-2][j+2] == Qi[i][j] 
                && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') {
            
                if (space(i+1, j-1, 45, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j+4, 45, 2) && space(i+1, j-1, 45, 1)) || (space(i-3, j+3, 45, 1) && space(i+1, j-1, 45, 2))) return 9;
            //活三 +2
            if (space(i-3, j+3, 45, 1) && space(i+1, j-1, 45, 1)) return 5;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != Qi[i][j]) && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && i+2 < 15 && j-2 >= 0 
                && Qi[i+2][j-2] == Qi[i][j] && i+3 < 15 && j-3 >= 0 && Qi[i+3][j-3] == Qi[i][j] && (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') && (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || j+1 > 14 || Qi[i-1][j+1] != ' ') {
            
                if (space(i+4, j-4, 45, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+4 > 14 || j-4 < 0 || Qi[i+4][j-4] != ' ') {
            
                if (space(i-1, j+1, 45, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j+1, 45, 1) && space(i+4, j-4, 45, 1)) return 1000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != Qi[i][j]) && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && i+1 < 15 && j-1 >= 0 
                && Qi[i+1][j-1] == Qi[i][j] && i+2 < 15 && j-2 >= 0 && Qi[i+2][j-2] == Qi[i][j] && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') && (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || j+2 > 14 || Qi[i-2][j+2] != ' ') {
            
                if (space(i+3, j-3, 45, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j-3 < 0 || Qi[i+3][j-3] != ' ') {
            
                if (space(i-2, j+2, 45, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j+2, 45, 1) && space(i+3, j-3, 45, 1)) return 1000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != Qi[i][j]) && i-2 >= 0 && j+2 < 15 && Qi[i-2][j+2] == Qi[i][j] && i-1 >= 0 && j+1 < 15 
                && Qi[i-1][j+1] == Qi[i][j] && i+1 < 15 && j-1 >= 0 && Qi[i+1][j-1] == Qi[i][j] && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') && (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || j+3 > 14 || Qi[i-3][j+3] != ' ') {
            
                if (space(i+2, j-2, 45, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j-2 < 0 || Qi[i+2][j-2] != ' ') {
            
                if (space(i-3, j+3, 45, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j+3, 45, 1) && space(i+2, j-2, 45, 1)) return 1000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != Qi[i][j]) && i-3 >= 0 && j+3 < 15 && Qi[i-3][j+3] == Qi[i][j] && i-2 >= 0 && j+2 < 15 
                && Qi[i-2][j+2] == Qi[i][j] && i-1 >= 0 && j+1 < 15 && Qi[i-1][j+1] == Qi[i][j] && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != ' ') && (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || j+4 > 14 || Qi[i-4][j+4] != ' ') {
            
                if (space(i+1, j-1, 45, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j-1 < 0 || Qi[i+1][j-1] != ' ') {
            
                if (space(i-4, j+4, 45, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j+4, 45, 1) && space(i+1, j-1, 45, 1)) return 1000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_90(i, j) {
    
		//console.log("call value_90()");
	
        //一连
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
        
            //死一
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲一 +4，+5
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+1, 90, 4)) return 0;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 4)) return 0;
                return 0;
            }
            
            //活一 +5
            if ((space(i, j-4, 90, 4) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 3) && space(i, j+1, 90, 2)) 
                    || (space(i, j-2, 90, 2) && space(i, j+1, 90, 3)) || (space(i, j-1, 90, 1) && space(i, j+1, 90, 4))) 
                return 1;
            //活一 +4
            if ((space(i, j-3, 90, 3) && space(i, j+1, 90, 1)) || (space(i, j-2, 90, 2) && space(i, j+1, 90, 2)) 
                    || (space(i, j-1, 90, 1) && space(i, j+1, 90, 3)))
                return 0;
            
            return 0;
        }  
        
        //二连
        //左一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
        
            //死二
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
            //冲二 +3, +4
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+2, 90, 3)) return 3;
                return 0;
            }
            //右顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i, j-3, 90, 3) && space(i, j+2, 90, 1)) || (space(i, j-2, 90, 2) && space(i, j+2, 90, 2)) 
                    || (space(i, j-1, 90, 1) && space(i, j+2, 90, 3))) return 5;
            //活二 +3
            if ((space(i, j-2, 90, 2) && space(i, j+2, 90, 1)) || (space(i, j-1, 90, 1) && space(i, j+2, 90, 2)))
                return 3;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
        
            //死二
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲二 +3, +4
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+1, 90, 3)) return 3;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i, j-4, 90, 3) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 2) && space(i, j+1, 90, 2)) 
                    || (space(i, j-2, 90, 1) && space(i, j+1, 90, 3))) return 5;
            //活二 +3
            if ((space(i, j-3, 90, 2) && space(i, j+1, 90, 1)) || (space(i, j-2, 90, 1) && space(i, j+1, 90, 2)))
                return 3;
            
            return 0;
        }
        
        //三连
        //左一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && j+2 < 15 && Qi[i][j+2] == Qi[i][j] 
            && (j+3 > 14 || Qi[i][j+3] != Qi[i][j])) {
    
            //死三
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+3 > 14 || Qi[i][j+3] != ' ')) return 0;
            
            //冲三 +2， +3
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+3, 90, 2)) return 5;
                return 0;
            }
            //右顶
            if (j+3 > 14 || Qi[i][j+3] != ' ') {
            
                if (space(i, j-2, 90, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-2, 90, 2) && space(i, j+3, 90, 1)) || (space(i, j-1, 90, 1) && space(i, j+3, 90, 2))) return 9;
            //活三 +2
            if (space(i, j-1, 90, 1) && space(i, j+3, 90, 1)) return 5;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && j+1 < 15 && Qi[i][j+1] == Qi[i][j] 
            && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
    
            //死三
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
            //冲三 +2， +3
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+2, 90, 2)) return 5;
                return 0;
            }
            //下顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-3, 90, 2) && space(i, j+2, 90, 1)) || (space(i, j-2, 90, 1) && space(i, j+2, 90, 2))) return 9;
            //活三 +2
            if (space(i, j-2, 90, 1) && space(i, j+2, 90, 1)) return 5;
            
            return 0;
        }
        //左三位
        if ((j-3 < 0 || Qi[i][j-3] != Qi[i][j]) && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] 
            && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
    
            //死三
            if ((j-3 < 0 || Qi[i][j-3] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲三 +2， +3
            //左顶
            if (j-3 < 0 || Qi[i][j-3] != ' ') {
            
                if (space(i, j+1, 90, 2)) return 5;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i, j-4, 90, 2) && space(i, j+1, 90, 1)) || (space(i, j-3, 90, 1) && space(i, j+1, 90, 2))) return 9;
            //活三 +2
            if (space(i, j-3, 90, 1) && space(i, j+1, 90, 1)) return 5;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((j-1 < 0 || Qi[i][j-1] != Qi[i][j]) && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && j+2 < 15 && Qi[i][j+2] == Qi[i][j] 
            && j+3 < 15 && Qi[i][j+3] == Qi[i][j] && (j+4 > 14 || Qi[i][j+4] != Qi[i][j])) {
    
            //死四
            if ((j-1 < 0 || Qi[i][j-1] != ' ') && (j+4 > 14 || Qi[i][j+4] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-1 < 0 || Qi[i][j-1] != ' ') {
            
                if (space(i, j+4, 90, 1)) return 9;
                return 0;
            }
            //右顶
            if (j+4 > 14 || Qi[i][j+4] != ' ') {
            
                if (space(i, j-1, 90, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-1, 90, 1) && space(i, j+4, 90, 1)) return 1000;
            
            return 0;
        }
        //左二位
        if ((j-2 < 0 || Qi[i][j-2] != Qi[i][j]) && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && j+1 < 15 && Qi[i][j+1] == Qi[i][j] 
            && j+2 < 15 && Qi[i][j+2] == Qi[i][j] && (j+3 > 14 || Qi[i][j+3] != Qi[i][j])) {
    
            //死四
            if ((j-2 < 0 || Qi[i][j-2] != ' ') && (j+3 > 14 || Qi[i][j+3] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-2 < 0 || Qi[i][j-2] != ' ') {
            
                if (space(i, j+3, 90, 1)) return 9;
                return 0;
            }
            //右顶
            if (j+3 > 14 || Qi[i][j+3] != ' ') {
            
                if (space(i, j-2, 90, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-2, 90, 1) && space(i, j+3, 90, 1)) return 1000;
            
            return 0;
        }
        //左三位
        if ((j-3 < 0 || Qi[i][j-3] != Qi[i][j]) && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] 
            && j+1 < 15 && Qi[i][j+1] == Qi[i][j] && (j+2 > 14 || Qi[i][j+2] != Qi[i][j])) {
    
            //死四
            if ((j-3 < 0 || Qi[i][j-3] != ' ') && (j+2 > 14 || Qi[i][j+2] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-3 < 0 || Qi[i][j-3] != ' ') {
            
                if (space(i, j+2, 90, 1)) return 9;
                return 0;
            }
            //右顶
            if (j+2 > 14 || Qi[i][j+2] != ' ') {
            
                if (space(i, j-3, 90, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-3, 90, 1) && space(i, j+2, 90, 1)) return 1000;
            
            return 0;
        }
        //上四位
        if ((j-4 < 0 || Qi[i][j-4] != Qi[i][j]) && j-3 >= 0 && Qi[i][j-3] == Qi[i][j] && j-2 >= 0 && Qi[i][j-2] == Qi[i][j] 
            && j-1 >= 0 && Qi[i][j-1] == Qi[i][j] && (j+1 > 14 || Qi[i][j+1] != Qi[i][j])) {
    
            //死四
            if ((j-4 < 0 || Qi[i][j-4] != ' ') && (j+1 > 14 || Qi[i][j+1] != ' ')) return 0;
            
            //冲四 +1， +2
            //左顶
            if (j-4 < 0 || Qi[i][j-4] != ' ') {
            
                if (space(i, j+1, 90, 1)) return 9;
                return 0;
            }
            //右顶
            if (j+1 > 14 || Qi[i][j+1] != ' ') {
            
                if (space(i, j-4, 90, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i, j-4, 90, 1) && space(i, j+1, 90, 1)) return 1000;
            
            return 0;
        }
        
        return 10000;
    }
    
    function value_135(i, j) {
		
		//console.log("call value_135()");
		
        //一连
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
        
            //死一
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲一 +4，+5
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+1, j+1, 135, 4)) return 0;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 4)) return 0;
                return 0;
            }
            
            //活一 +5
            if ((space(i-4, j-4, 135, 4) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 3) && space(i+1, j+1, 135, 2)) 
                    || (space(i-2, j-2, 135, 2) && space(i+1, j+1, 135, 3)) || (space(i-1, j-1, 135, 1) && space(i+1, j+1, 135, 4))) 
                return 1;
            //活一 +4
            if ((space(i-3, j-3, 135, 3) && space(i+1, j+1, 135, 1)) || (space(i-2, j-2, 135, 2) && space(i+1, j+1, 135, 2)) 
                    || (space(i-1, j-1, 135, 1) && space(i+1, j+1, 135, 3)))
                return 0;
            
            return 0;
        }  
        
        //二连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] 
                && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
        
            //死二
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+2, j+2, 135, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-3, j-3, 135, 3) && space(i+2, j+2, 135, 1)) || (space(i-2, j-2, 135, 2) && space(i+2, j+2, 135, 2)) 
                    || (space(i-1, j-1, 135, 1) && space(i+2, j+2, 135, 3))) return 5;
            //活二 +3
            if ((space(i-2, j-2, 135, 2) && space(i+2, j+2, 135, 1)) || (space(i-1, j-1, 135, 1) && space(i+2, j+2, 135, 2)))
                return 3;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] 
                && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
        
            //死二
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲二 +3, +4
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+1, j+1, 135, 3)) return 3;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 3)) return 3;
                return 0;
            }
            
            //活二 +4
            if ((space(i-4, j-4, 135, 3) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 2) && space(i+1, j+1, 135, 2)) 
                    || (space(i-2, j-2, 135, 1) && space(i+1, j+1, 135, 3))) return 5;
            //活二 +3
            if ((space(i-3, j-3, 135, 2) && space(i+1, j+1, 135, 1)) || (space(i-2, j-2, 135, 1) && space(i+1, j+1, 135, 2)))
                return 3;
            
            return 0;
        }
        
        //三连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] 
                && i+2 < 15 && j+2 < 15 && Qi[i+2][j+2] == Qi[i][j] && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != Qi[i][j])) {
    
            //死三
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+3, j+3, 135, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ') {
            
                if (space(i-2, j-2, 135, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-2, j-2, 135, 2) && space(i+3, j+3, 135, 1)) || (space(i-1, j-1, 135, 1) && space(i+3, j+3, 135, 2))) return 9;
            //活三 +2
            if (space(i-1, j-1, 135, 1) && space(i+3, j+3, 135, 1)) return 5;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] 
                && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
    
            //死三
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+2, j+2, 135, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-3, j-3, 135, 2) && space(i+2, j+2, 135, 1)) || (space(i-2, j-2, 135, 1) && space(i+2, j+2, 135, 2))) return 9;
            //活三 +2
            if (space(i-2, j-2, 135, 1) && space(i+2, j+2, 135, 1)) return 5;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != Qi[i][j]) && i-2 >= 0 && j-2 >= 0 && Qi[i-2][j-2] == Qi[i][j] 
                && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
    
            //死三
            if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲三 +2， +3
            //上顶
            if (i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') {
            
                if (space(i+1, j+1, 135, 2)) return 5;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 2)) return 5;
                return 0;
            }
            
            //活三 +3
            if ((space(i-4, j-4, 135, 2) && space(i+1, j+1, 135, 1)) || (space(i-3, j-3, 135, 1) && space(i+1, j+1, 135, 2))) return 9;
            //活三 +2
            if (space(i-3, j-3, 135, 1) && space(i+1, j+1, 135, 1)) return 5;
            
            return 0;
        }
        
        //四连
        //上一位
        if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != Qi[i][j]) && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && i+2 < 15 && j+2 < 15 
                && Qi[i+2][j+2] == Qi[i][j] && i+3 < 15 && j+3 < 15 && Qi[i+3][j+3] == Qi[i][j] && (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != Qi[i][j])) {
    
            //死四
            if ((i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') && (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-1 < 0 || j-1 < 0 || Qi[i-1][j-1] != ' ') {
            
                if (space(i+4, j+4, 135, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+4 > 14 || j+4 > 14 || Qi[i+4][j+4] != ' ') {
            
                if (space(i-1, j-1, 135, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-1, j-1, 135, 1) && space(i+4, j+4, 135, 1)) return 1000;
            
            return 0;
        }
        //上二位
        if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != Qi[i][j]) && i-1 >= 0 && j-1 >= 0 && Qi[i-1][j-1] == Qi[i][j] && i+1 < 15 && j+1 < 15 
                && Qi[i+1][j+1] == Qi[i][j] && i+2 < 15 && j+2 < 15 && Qi[i+2][j+2] == Qi[i][j] && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != Qi[i][j])) {
    
            //死四
            if ((i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') && (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-2 < 0 || j-2 < 0 || Qi[i-2][j-2] != ' ') {
            
                if (space(i+3, j+3, 135, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+3 > 14 || j+3 > 14 || Qi[i+3][j+3] != ' ') {
            
                if (space(i-2, j-2, 135, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-2, j-2, 135, 1) && space(i+3, j+3, 135, 1)) return 1000;
            
            return 0;
        }
        //上三位
        if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != Qi[i][j]) && i-2 >= 0 && j-2 >= 0 && Qi[i-2][j-2] == Qi[i][j] && i-1 >= 0 && j-1 >= 0 
                && Qi[i-1][j-1] == Qi[i][j] && i+1 < 15 && j+1 < 15 && Qi[i+1][j+1] == Qi[i][j] && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != Qi[i][j])) {
    
            //死四
            if ((i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') && (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-3 < 0 || j-3 < 0 || Qi[i-3][j-3] != ' ') {
            
                if (space(i+2, j+2, 135, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+2 > 14 || j+2 > 14 || Qi[i+2][j+2] != ' ') {
            
                if (space(i-3, j-3, 135, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-3, j-3, 135, 1) && space(i+2, j+2, 135, 1)) return 1000;
            
            return 0;
        }
        //上四位
        if ((i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != Qi[i][j]) && i-3 >= 0 && j-3 >= 0 && Qi[i-3][j-3] == Qi[i][j] && i-2 >= 0 && j-2 >= 0 
                && Qi[i-2][j-2] == Qi[i][j] && i-1 >= 0 && j-1 > 0 && Qi[i-1][j-1] == Qi[i][j] && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != Qi[i][j])) {
    
            //死四
            if ((i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != ' ') && (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ')) return 0;
            
            //冲四 +1， +2
            //上顶
            if (i-4 < 0 || j-4 < 0 || Qi[i-4][j-4] != ' ') {
            
                if (space(i+1, j+1, 135, 1)) return 9;
                return 0;
            }
            //下顶
            if (i+1 > 14 || j+1 > 14 || Qi[i+1][j+1] != ' ') {
            
                if (space(i-4, j-4, 135, 1)) return 9;
                return 0;
            }
                        
            //活四 +2
            if (space(i-4, j-4, 135, 1) && space(i+1, j+1, 135, 1)) return 1000;
            
            return 0;
        }
        
        return 10000;
    }
	
	function value(i, j) {
    
		console.log("call value()");
	
        if (Qi[i][j] != ' ') return 0;
        
        Qi[i][j] = 'X';
        
        var a = value_0(i, j);
        
        var b = value_45(i, j);
        
        var c = value_90(i, j);
        
        var d = value_135(i, j);
        
        Qi[i][j] = 'O';
        
        a += value_0(i, j);
        
        b += value_45(i, j);
        
        c += value_90(i, j);
        
        d += value_135(i, j);
        
        Qi[i][j] = ' ';
                
        return a+b+c+d;
    }
	
	function AI(c) {
        
		console.log("call AI()");
		
        var _i = 0;
        
        var _j = 0;
        
        var max_value = 0;
        
        for (var i = 0; i < 15; i++) {
        
            for (var j = 0; j < 15; j++) {
                
                 var temp_value =  value(i, j);
                 //if (temp_value >= 1000 || true) System.out.printf("| "+i+", "+j+": "+temp_value+" |");
                 if (temp_value > max_value) {
                     
                     _i = i;
                     _j = j;
                     max_value = temp_value;
                 }
                 if (temp_value == max_value) {
                 
                     var index = Math.floor(Math.random() * 2);
                     if (index == 1) {
                         
                         _i = i;
                         _j = j;
                     }
                 }
            }
            //System.out.println("\n");
        }
		
		//System.out.println("\nmax:   "+_i+", "+_j+": "+max_value);
        index = move(_i, _j, c);
		if (index) {
			
			var _zi = document.createElement('div');
			_zi.className="zi";
			_zi.style.backgroundColor="white";
			index = 1 - index;
			document.getElementById(_i+","+_j).appendChild(_zi);
		}
        else {
        
            for (var i = 0; i < 15; i++) {
            
                for (var j = 0; j < 15; j++) {
                
                    if (Qi[i][j] == ' ') {
                        
                        move(i, j, c);
                        i = 15;
                        j = 15;
						var _zi = document.createElement('div');
						_zi.className="zi";
						_zi.style.backgroundColor="white";
						index = 1 - index;
						document.getElementById(_i+","+_j).appendChild(_zi);
                    }
                }
            }
        }      
    }
	
	
	
	
	var index = 0;
	
	for (i = 0; i < 15; i++) {
		
		for (j = 0; j < 15; j++) {
		
			
			var _div = document.createElement('div');
			_div.className="cube";
			_div.id=i+","+j;
			/*if ((i+j) % 2 == 0) _div.style.backgroundColor="red";
			else _div.style.backgroundColor="green";
			_div.style.opacity = "1";
			*/
			document.getElementById("grid").appendChild(_div);
			
			document.getElementById(_div.id).onclick = function () {
		
				var pos = this.id.indexOf(",");
				var _i = this.id.slice(0,pos);
				var _j = this.id.slice(pos+1,this.id.length);
				//alert(_i+":"+_j);
				alert(localStorage.getItem('pl'));
				
				if (localStorage.getItem('pl') == 0) {
					
					if (valid_move(_i, _j)) {
						
						move(_i, _j, 'X');
						var _zi = document.createElement('div');
						_zi.className="zi";
						_zi.style.backgroundColor="black";
						index = 1 - index;
						document.getElementById(this.id).appendChild(_zi);
						if (win()) {
							
							setTimeout(function() {alert("PLAYER WINS!!!");}, 500);
						}
						else {
							
							setTimeout(function() { AI('O'); }, 500);
							setTimeout(function() {if(win()) {alert("AI WINS!!!")}}, 1000);
						}
					}
					else alert("invalid move!");
				}
			}
		}
	}
	
	






	
	
