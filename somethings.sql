-- phpMyAdmin SQL Dump
-- version 4.2.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015-03-27 14:06:51
-- 服务器版本： 5.5.37-log
-- PHP Version: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `somethings`
--

-- --------------------------------------------------------

--
-- 表的结构 `236_album`
--

CREATE TABLE IF NOT EXISTS `236_album` (
`aid` int(11) NOT NULL,
  `album` char(80) NOT NULL,
  `info` text NOT NULL,
  `owner_uid` int(11) NOT NULL,
  `is_public` tinyint(1) NOT NULL COMMENT '是否允许他人添加文章',
  `morder` tinyint(1) NOT NULL COMMENT '排序方式 1 推荐 2 发布时间',
  `dateline` datetime NOT NULL,
  `lastline` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `236_album`
--

INSERT INTO `236_album` (`aid`, `album`, `info`, `owner_uid`, `is_public`, `morder`, `dateline`, `lastline`, `status`) VALUES
(1, 'nodejs', 'nodejs', 1, 1, 2, '2014-11-26 16:16:42', '2014-11-26 16:16:42', 1),
(2, 'DIV+CSS', 'DIV+CSS', 1, 1, 2, '2014-11-26 16:17:14', '2014-11-26 16:17:14', 1),
(3, 'JAVA', 'JAVA', 2, 1, 2, '2014-11-26 16:19:29', '2014-11-26 16:19:29', 1),
(4, 'IOS', 'IOS', 6, 1, 2, '2014-11-26 16:20:01', '2014-11-26 16:20:01', 1),
(5, 'LINUX', 'LINUX', 3, 1, 2, '2014-11-26 16:20:26', '2014-11-26 16:20:26', 1),
(6, 'PHP', 'PHP', 1, 1, 2, '2014-11-26 23:37:24', '2014-11-26 23:37:24', 1);

-- --------------------------------------------------------

--
-- 表的结构 `236_album_0`
--

CREATE TABLE IF NOT EXISTS `236_album_0` (
  `aid` int(11) NOT NULL,
  `num` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `236_album_0`
--

INSERT INTO `236_album_0` (`aid`, `num`) VALUES
(1, 0),
(2, 0),
(3, 0),
(4, 0),
(5, 0),
(6, 0);

-- --------------------------------------------------------

--
-- 表的结构 `236_articles`
--

CREATE TABLE IF NOT EXISTS `236_articles` (
`id` int(11) NOT NULL,
  `owner_uid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '文章题目',
  `content` text NOT NULL COMMENT '文章内容',
  `collect_id` int(11) NOT NULL COMMENT '专辑id',
  `create_time` datetime NOT NULL COMMENT '发布时间',
  `update_time` datetime NOT NULL COMMENT '最后更新时间',
  `view` int(11) NOT NULL COMMENT '查看',
  `reply` int(11) NOT NULL COMMENT '回复',
  `up` int(11) NOT NULL COMMENT '推荐',
  `status` tinyint(3) NOT NULL DEFAULT '1' COMMENT '状态'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- 转存表中的数据 `236_articles`
--

INSERT INTO `236_articles` (`id`, `owner_uid`, `title`, `content`, `collect_id`, `create_time`, `update_time`, `view`, `reply`, `up`, `status`) VALUES
(1, 2, 'Centos如何挂载硬盘', '<p>远程SSH登录上Centos服务器后，进行如下操作 提醒：挂载操作会清空数据，请确认挂载盘无数据或者未使用\n第一步：列出所有磁盘 命令:</p>\n<pre><code>ll /dev/disk/by-path    </code></pre>\n<p>提示：如果无法确认数据盘设备名称，请使用df命令来确认系统盘的名称，从而排除挂错盘的情况。</p>\n<p>第二步：格式化硬盘 命令:</p>\n<pre><code>fdisk /dev/sdb </code></pre>\n<p>第三步：创建分区 命令:</p>\n<pre><code>mkfs.ext4 /dev/sdb1    </code></pre>\n<p>第四步：挂载分区 命令:</p>\n<pre><code>mkdir /data \nmount /dev/sdb1 /data    # 将sdb这个硬盘挂载成为/data    </code></pre>\n<p>第五步：将信息写入fstab,让系统开启自动挂载。 命令：</p>\n<pre><code> echo &quot;/dev/sdb1               /data                   ext4    defaults        0 0&quot; &gt;&gt; /etc/fstab  </code></pre>\n', 5, '2014-01-18 15:32:40', '0000-00-00 00:00:00', 68, 0, 1, 1),
(2, 3, 'Centos如何挂载硬盘', '<p>Centos如何挂载硬盘</p>\n<p>远程SSH登录上Centos服务器后，进行如下操作 提醒：挂载操作会清空数据，请确认挂载盘无数据或者未使用\n第一步：列出所有磁盘 命令:</p>\n<p><code>ll /dev/disk/by-path</code> </p>\n<p>提示：如果无法确认数据盘设备名称，请使用df命令来确认系统盘的名称，从而排除挂错盘的情况。</p>\n<p>第二步：格式化硬盘 命令:</p>\n<p><code>fdisk /dev/sdb</code></p>\n<p>第三步：创建分区 命令:</p>\n<p><code>mkfs.ext4 /dev/sdb1</code></p>\n<p>第四步：挂载分区 命令:</p>\n<p><code>mkdir /data \nmount /dev/sdb1 /data    # 将sdb这个硬盘挂载成为/data</code></p>\n<p>第五步：将信息写入fstab,让系统开启自动挂载。 命令：\n<code>echo &quot;/dev/sdb1               /data                   ext4    defaults        0 0&quot; &gt;&gt; /etc/fstab</code></p>\n', 5, '2014-01-18 15:37:46', '0000-00-00 00:00:00', 22, 0, 0, 1),
(29, 2, '一些nodejs实现同步操作想法实现 ', '<p>众所周知，异步是nodejs中得天独厚的特点和优势，但同时在程序中同步的需求（比如控制程序的执行顺序为：func1 -&gt; func2 -&gt;func3 ）也是很常见的。本文就是对这个问题记录自己的一些想法。<br>需要执行的函数：<br><code>var func1 = function(req,res,callback){\n  setTimeout(function(){\n    console.log(&#39;in func1&#39;);\n    callback(req,res,1);  \n  },13000);\n}\nvar func2 = function(req,res,callback){ \n  setTimeout(function(){\n    console.log(&#39;in func2&#39;);\n    callback(req,res,2);\n  },5000);\n}\nvar func3 = function(req,res,callback){\n  setTimeout(function(){\n    console.log(&#39;in func3&#39;);\n    callback(req,res,3);   \n  },1000);\n}</code></p>\n<p>可以看出在func1，func2和func3中都是用了setTimeout函数，执行的时间分别为13秒，5秒和1秒。由于nodejs异步的特性，如果使用普通的函数调用方法：<br><code>var req = null;\nvar res = null;\nvar callback = function(){};\nfunc1(req,res,callback);\nfunc2(req,res,callback);\nfunc3(req,res,callback);</code><br>输出内容：<br><code>in func3\nin func2\nin func1</code><br>     原因是因为nodejs是异步的，func2不会等func1执行完毕后再执行，而是立即执行（func3也是如此）。由于func3的运行时间最短而率先结束，func2次之，func1最后。但这明显不是我们想要的结果。怎么办？<br>     解决办法一：callback<br><code>//深层嵌套  \nvar req = null;\nvar res = null;\nfunc1(req,res,function(){\n  func2(req,res,function(){\n    func3(req,res,function(){\n      process.exit(0);   \n    })  \n  });  \n});</code><br>     这种方法虽然能快速的解决，但暴露的问题也很明显，一是代码维护不方面，二是代码的深层嵌套看起来很不舒服。这种方法并不可取。<br>     解决方法二：递归调用<br><code>function executeFunc(funcs,count,sum,req,res){\n  if(count == sum){\n     return ; \n   }\n   else{\n    funcs[count](req,req,function(){\n       count++;\n       executeFunc(funcs,count,sum,req,res);\n    });\n   }  \n}\n//同步调用\nvar req = null;\nvar res = null;\nvar funcs = [func1,func2,func3];\nvar len = funcs.length;\nexecuteFunc(funcs,0,len,req,res);</code><br>先将多个函数组成一个数组。再可以利用递归函数的特性，使程序按照一定的顺序执行。\n解决方法三：调用类库 \n随着nodejs的发展，响应的类库也越来越多。Step和async 就是其中不错的。    </p>\n<ol>\n<li>Step的调用相对比较清爽：<br><code>Step(\nfunction thefunc1(){\n func1(this);\n},\nfunction thefunc2(finishFlag){\n console.log(finishFlag);\n func2(this);\n},\nfunction thefunc3(finishFlag){\n console.log(finishFlag);\n}\n);</code><br>2.async 的 series方法，就本例而言，它的调用方法：<br><code>var req = null;\nvar res = null;\nvar callback = function(){};\nasync.series(\n[\n function(callback){\n   func1(req,res,callback);\n },  \n function(callback){\n   func2(req,res,callback);\n },\n function(callback){\n   func3(req,res,callback);  \n } \n]\n);</code></li>\n</ol>\n', 1, '2014-03-06 16:55:08', '2014-03-06 16:55:08', 24, 0, 0, 1),
(30, 5, '可信网络', '<p>网络安全：黑客、病毒、网虫……\n可信网络：用户的身份认证，行为可信认证。\n用户行为分析，用户行为特征集体</p>\n', 5, '2014-03-18 21:00:28', '2014-03-18 21:00:28', 11, 0, 0, 1),
(31, 1, 'Centos如何挂载硬盘', '<p>远程SSH登录上Centos服务器后，进行如下操作 提醒：挂载操作会清空数据，请确认挂载盘无数据或者未使用 第一步：列出所有磁盘 命令:</p>\n<p>ll /dev/disk/by-path    </p>\n<p>提示：如果无法确认数据盘设备名称，请使用df命令来确认系统盘的名称，从而排除挂错盘的情况。</p>\n<p>第二步：格式化硬盘 命令:</p>\n<p>fdisk /dev/sdb </p>\n<p>第三步：创建分区 命令:</p>\n<p>mkfs.ext4 /dev/sdb1    </p>\n<p>第四步：挂载分区 命令:</p>\n<p>mkdir /data \nmount /dev/sdb1 /data    # 将sdb这个硬盘挂载成为/data    </p>\n<p>第五步：将信息写入fstab,让系统开启自动挂载。 命令：</p>\n<p> echo &quot;/dev/sdb1               /data                   ext4    defaults        0 0&quot; &gt;&gt; /etc/fstab  </p>\n', 5, '2014-11-20 18:13:33', '2014-11-20 18:13:33', 9, 0, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `236_user`
--

CREATE TABLE IF NOT EXISTS `236_user` (
`id` int(11) NOT NULL,
  `account` char(12) NOT NULL COMMENT '账号',
  `name` char(12) NOT NULL COMMENT '姓名',
  `password` char(32) NOT NULL COMMENT '密码',
  `avatar` char(24) NOT NULL COMMENT '头像',
  `motto` varchar(255) NOT NULL COMMENT '座右铭',
  `last_login_time` datetime NOT NULL COMMENT '上次登录时间'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `236_user`
--

INSERT INTO `236_user` (`id`, `account`, `name`, `password`, `avatar`, `motto`, `last_login_time`) VALUES
(1, 'minglei1202', '李明雷', 'd41d8cd98f00b204e9800998ecf8427e', '/avatar/1.png', '', '0000-00-00 00:00:00'),
(2, 'zhanghongkai', '张宏凯', 'ce20f7142dfe564c4b26f19c04aa59b5', '/avatar/2.png', '', '0000-00-00 00:00:00'),
(3, 'changyunqi', '常运启', 'fa17a6cbef68ebe823d1c369939e155e', '/avatar/3.png', '', '0000-00-00 00:00:00'),
(4, 'mayanfa', '马艳发', '7281208aaef9dad25c23b6b558466910', '', '', '0000-00-00 00:00:00'),
(5, 'caoyangwei', '曹阳威', '2b601ef3ff48938550623c6c5faee690', '', '', '0000-00-00 00:00:00'),
(6, 'xuzhichao', '许智超', 'f899dc96a92609e5d7e28018768544f0', '/avatar/6.png', '', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `236_album`
--
ALTER TABLE `236_album`
 ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `236_articles`
--
ALTER TABLE `236_articles`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `236_user`
--
ALTER TABLE `236_user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `236_album`
--
ALTER TABLE `236_album`
MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `236_articles`
--
ALTER TABLE `236_articles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `236_user`
--
ALTER TABLE `236_user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
