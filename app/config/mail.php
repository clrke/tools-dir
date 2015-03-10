<?php

return array(
	'driver' => 'smtp',
	'host' => 'smtp.gmail.com',
	'port' => 587,
	'from' => array('address' => 'pup.nlp.sig@gmail.com', 'name' => 'PUP NLP SIG'),
	'encryption' => 'tls',
	'username' => 'pup.nlp.sig',
	'password' => 'pupnlpsig',
	'sendmail' => '/usr/sbin/sendmail -bs',
	'pretend' => false,
);
