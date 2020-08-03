## 向量
v1 = (x1, y1)
v1.length = Math.hypot(x1, y1)
v1.dir = Math.tan2(y1, x1)

v1.x = v1.length * Math.cos(v1.dir)
v1.y = v1.length * Math.sin(v1.dir)

### 加和
v1 = (x1, y1), v2 = (x2, y2)
v1 + v2 = (x1+x2, y1+y2) 
|v1+v2| = Math.hypot(x1+x2, y1+y2)


## 点乘

v1 = (x1, y1), v2 = (x2, y2)

v1 * v2 =  x1 * x2+ y1 * y2 = |v1||v2|cosO

假设 v1 = (1,1) v2 = (1,0);
v1*v2 = 1+0 = 1.4 * Math.cos(PI/4) 

假设  v1 = (1,0)  v2 = (0,1)
v1 * v2 = 0 = 1 * 1 * Math.cos(PI/2)  

假设 v1 = (1,0) v2= (2,0)
v1 * v2 = 1 * 2 = 2 = 1 * 2 * Math.cos(0)

判断依据： |v1||v2| 与 v1 * v2的关系


## 叉乘
v1 x v2 = x1 * y2 - x2 * y1 = |v1| |v2| * sinO

假设 v1 = (1,1) v2 = (1,0);
v1*v2 = 1 - 0 = 1.4 * Math.sin(PI/4) 

假设  v1 = (1,0)  v2 = (0,1)
v1 * v2 = 0 = 1 * 1 * Math.cos(PI/2)  

假设 v1 = (1,0) v2= (2,0)
v1 * v2 = 1 * 2 = 2 = 1 * 2 * Math.cos(0)


## 总结

|a X b| 的结果就是 a、b 夹角的正弦值，
而|a • b|的结果就是 a、b 夹角的余弦值
