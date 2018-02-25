  window.onload=function(){
	  document.body.onkeydown=function(event){
		  onKeyPress(event);
	  };
  }
  //每一格的间距，也即一个小方块的尺寸
  Spacing=20;
  
  //各种形状的编号，0代表没有形状
  NoShape=0;
  ZShape=1;
  SShape=2;
  LineShape=3;
  TShape=4;
  SquareShape=5;
  LShape=6;
  MirroredLShape=7

  //各种形状的颜色
  Colors=["black","fuchsia","#cff","red","orange","aqua","green","yellow"];

  //各种形状的数据描述
  Shapes=[
	  [ [ 0, 0 ],   [ 0, 0 ],   [ 0, 0 ],   [ 0, 0 ] ],
	  [ [ 0, -1 ],  [ 0, 0 ],   [ -1, 0 ],  [ -1, 1 ] ],
	  [ [ 0, -1 ],  [ 0, 0 ],   [ 1, 0 ],   [ 1, 1 ] ],
	  [ [ 0, -1 ],  [ 0, 0 ],   [ 0, 1 ],   [ 0, 2 ] ],
	  [ [ -1, 0 ],  [ 0, 0 ],   [ 1, 0 ],   [ 0, 1 ] ],
	  [ [ 0, 0 ],   [ 1, 0 ],   [ 0, 1 ],   [ 1, 1 ] ],
	  [ [ -1, -1 ], [ 0, -1 ],  [ 0, 0 ],   [ 0, 1 ] ],
	  [ [ 1, -1 ],  [ 0, -1 ],  [ 0, 0 ],   [ 0, 1 ] ]
  ];

  //将形状自身的坐标系转换为  Map 的坐标系，row col 为当前形状原点在 Map 中的位置
  function translate(data,row,col){
	  var copy=[];
	  for(var i=0;i<4;i++){
		  var temp={};
		  temp.row=data[i][1]+row;
		  temp.col=data[i][0]+col;
		  copy.push(temp);
	  }
	  return copy;
  }

  //向右旋转一个形状：x'=y, y'=-x
  function rotate(data){
	  var copy=[[],[],[],[]];
	  for(var i=0;i<4;i++){
		  copy[i][0]=data[i][1];
		  copy[i][1]=-data[i][0];
	  }
	  return copy;
  }

  // 说明：由 m 行 Line 组成的格子阵
  function  Map(w,h){
	  //游戏区域的长度和宽度
	  this.width=w;
	  this.height=h;
	  //生成 height 个 line 对象，每个 line 宽度为 width
	  this.lines=[];
	  for(var row=0;row<h;row++)
		  this.lines[row]=this.newLine();
  }
  
  //说明：间由 n 个格子组成的一行
  Map.prototype.newLine=function(){
	  var shapes=[];
	  for(var col=0;col<this.width;col++)
		  shapes[col]=NoShape;
	  return shapes;
  }

  //判断一行是否全部被占用
  //如果有一个格子为 NoShape 则返回 false
  Map.prototype.isFullLine=function(row){
	  var line=this.lines[row];
	  for(var col=0;col<this.width;col++)
		  if(line[col]==NoShape)
			  return false
	  return true;
  }
  /*
   * 预先移动或者旋转形状，然后分析形状中的四个点是否有碰撞情况：
   * 1：col<0 || col>this.width 超出左右边界
   * 2：row==this.height ，说明形状已经到最底部
   * 3：任意一点的 shape_id 不为 NoShape ，则发生碰撞
   *  如果发生碰撞则放弃移动或者旋转
   */
  Map.prototype.isCollide=function(data){
	  for(var i=0;i<4;i++){
		  var row=data[i].row;
		  var col=data[i].col;
		  if(col<0 || col==this.width) return true;
		  if(row==this.height) return true;
		  if(row<0) continue;
		  else
			  if(this.lines[row][col]!=NoShape)
				  return true;
	  }
	  return false;
  }

  //形状在向下移动过程中发生碰撞，则将形状加入到 Map 中
  Map.prototype.appendShape=function(shape_id,data){
	  //对于形状的四个点：
	  for(var i=0;i<4;i++){
		  var row=data[i].row;
		  var col=data[i].col;
		  //找到所在的格子,将格子的颜色改为形状的颜色
		  this.lines[row][col]=shape_id;
	  }
	  //========================================
	  //形状被加入到 Map 中后，要进行逐行检测，发现满行则消除
	  for(var row=0;row<this.height;row++){
		  if(this.isFullLine(row)){
			  //绘制消除效果
			  onClearRow(row);
			  //将满行删除
			  this.lines.splice(row,1);
			  //第一行添加新的一行
			  this.lines.unshift(this.newLine());;
		  }
	  }
  }

  // 说明：GameModel 类
  function GameModel(w,h){
	  this.map=new Map(w,h);
	  this.born();
	  //通知数据发生了更新
	  onUpdate();
  }

  //出生一个新的形状
  GameModel.prototype.born=function(){
	  //随机选择一个形状
	  this.shape_id=Math.floor(Math.random()*7)+1;
	  this.data=Shapes[this.shape_id];
	  //重置形状的位置为出生地点
	  this.row=1;
	  this.col=Math.floor(this.map.width/2);
  }

  //向左移动
  GameModel.prototype.left=function(){
	  this.col--;
	  var temp=translate(this.data,this.row,this.col);
	  if(this.map.isCollide(temp))
	  //发生碰撞则放弃移动
		  this.col++;
	  else
	  //通知数据发生了更新
		  onUpdate();
  }

  //向右移动
  GameModel.prototype.right=function(){
	  this.col++;
	  var temp=translate(this.data,this.row,this.col);
	  if(this.map.isCollide(temp))
		  this.col--;
	  else
		  onUpdate();
  }

  //旋转
  GameModel.prototype.rotate=function(){
	  //正方形不旋转
	  if(this.shape_id==SquareShape) return;
	  //获得旋转后的数据
	  var copy=rotate(this.data);
	  //转换坐标系
	  var temp=translate(copy,this.row,this.col);
	  //发生碰撞则放弃旋转
	  if(this.map.isCollide(temp))
		  return;
	  //将旋转后的数据设为当前数据
	  this.data=copy;
	  //通知数据发生了更新
	  onUpdate();
  }

  //下落
  GameModel.prototype.down=function(){
	  var old=translate(this.data,this.row,this.col);
	  this.row++;
	  var temp=translate(this.data,this.row,this.col);
	  if(this.map.isCollide(temp)){
		  //发生碰撞则放弃下落
		  this.row--;
		  //如果在 1 也无法下落，说明游戏结束
		  if(this.row==1) {
			  //通知游戏结束
			  onGameOver();
			  return;
		  }
		  //无法下落则将当前形状加入到 Map 中
		  this.map.appendShape(this.shape_id,old);
		  //出生一个新的形状
		  this.born();
	  }
	  //通知数据发生了更新
	  onUpdate();
  }

  //消息队列
  MessagesQueue=[];

  //消息编号
  UpdateMessage=0;
  ClearRowMessage=1;
  GameOverMessage=2;
  TickMessage=3;
  KeyPressMessage=4;

  //更新事件
  function onUpdate(){
	  var msg={};
	  msg.id=UpdateMessage;
	  MessagesQueue.push(msg);
  }
  //清除行事件
  function onClearRow(row){
	  var msg={};
	  msg.id=ClearRowMessage;
	  msg.row=row;
	  MessagesQueue.push(msg);
  }
  //游戏结束事件
  function onGameOver(){
	  var msg={};
	  msg.id=GameOverMessage;
	  MessagesQueue.push(msg);
  }
  //时钟事件
  function onTick(){
	  var msg={};
	  msg.id=TickMessage;
	  MessagesQueue.push(msg);
  }
  //按键事件
  function onKeyPress(evt){
	  evt.preventDefault();
	  var msg={};
	  msg.id=KeyPressMessage;
	  msg.which=evt.which;
	  MessagesQueue.push(msg);
  }

  var display= Display.attach(document.getElementById("gamecanvas"));
  var model = null;
  var loop_interval=null;
  var tick_interval=null;
  var waiting=false;
  var speed=500;

  function start(){
	  model = new GameModel(display.width/Spacing,display.height/Spacing);
	  loop();
  }

  function pause(){
	  waiting=!waiting;
	  if(waiting)
		  document.getElementById("btnPause").value="继续";
	  else
		  document.getElementById("btnPause").value="暂停";
  }

  //消息循环
  function loop(){
	  tick_interval=setInterval(function(){
		  if(waiting)return;
		  onTick();
	  },speed);

	  loop_interval=setInterval(function(){
		  if(waiting)return;
		  if(MessagesQueue.length>0){
			  var msg=MessagesQueue.shift();
			  switch(msg.id){
				  case TickMessage:
					  model.down();
					  break;
				  case UpdateMessage:
					  paint();
					  break;
				  case ClearRowMessage:
					  clearline(msg.row);break;
				  case KeyPressMessage:
					  move(msg.which);
					  break;
				  case GameOverMessage:
					  alert("Game Over");
					  clearInterval(tick_interval);
					  clearInterval(loop_interval);
					  break;
			  }
		  }
	  },0);
  }
  
  function move(which){
	  switch(which){
		  case 37:model.left();break;
		  case 39:model.right();break;
		  case 38:model.rotate();break;
		  case 40:model.down();break;
	  }
  }

  //以下才是真正的绘制代码=================

  //绘制清除行的暂停效果
  function clearline(row){
	  //增加速度
	  clearInterval(tick_interval);
	  clearInterval(loop_interval);
	  speed=speed-10;
	  loop();
	  //音效
	  document.getElementById("snd").play();
	  //停顿效果
	  waiting=true;
	  display.fillRect(0,row * Spacing, display.width, Spacing, "black");
	  setTimeout("waiting=false;",50);
  }

  //在内存中绘制一个小方块
  function drawRect(color){
	  var temp=new Surface(Spacing,Spacing,"rgba(255,255,255,0.2)");//背景色
	  temp.fillRect(1, 1, Spacing-2, Spacing-2, color);//前景色
	  return temp;
  }
  //小方块的缓存
  Rects=[drawRect(Colors[0]),drawRect(Colors[1]),drawRect(Colors[2]),drawRect(Colors[3])
	  ,drawRect(Colors[4]),drawRect(Colors[5]),drawRect(Colors[6]),drawRect(Colors[7])];

  function paint(){
	  var map=model.map;
	  var data=translate(model.data,model.row,model.col);
	  //清屏
	  display.clear();
	  var lines=map.lines;
	  //依次绘制每一个非空的格子
	  for(var row=0;row<map.height;row++)
		  for(var col=0;col<map.width;col++){
			  var shape_id=lines[row][col];
			  if(shape_id!=NoShape){
				  var y=row * Spacing;
				  var x=col * Spacing;
				  display.draw(Rects[shape_id], x, y);
			  }
	  }
	  //绘制当前的形状
	  for(var i=0;i<4;i++){
		  var y=data[i].row * Spacing;
		  var x=data[i].col * Spacing;
		  display.draw(Rects[model.shape_id], x, y);
	  }
  }
