# moniprobe

<p>
  This is a simple monitor service for any vm/container/pc 
  <ol>
    <li>It will provide cpu data, through a websocket at port 9002</li>  
    <li>It will provide network interface data, through a websocket at port 9003</li>
    <li>It will provide a web interface to monitor in rt, the data at port 9001</li>
  </ol>
  <b>Note:</b> make sure ethtool and bwm-ng are installed before using it
</p>
Just run:
<ul>
  <li>
     <b>For Anything with node 6.X:</b> ~$ npm run start
  </li> 
  <li>
    <b>For Linux:</b> ~$ ./moniprobe_linux
  </li>
  <li>
    <b>For Mac:</b> ~$ ./moniprobe_mac
  </li>
</ul>
  
  

