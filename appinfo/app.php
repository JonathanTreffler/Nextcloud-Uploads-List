<?php

use OCP\Util;
$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function(){
    Util::addScript('uploadslist', 'script' );
    Util::addStyle('uploadslist', 'style' );
});