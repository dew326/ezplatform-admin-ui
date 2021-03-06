<?php

namespace EzSystems\EzPlatformAdminUi\EventListener;

use EzSystems\EzPlatformAdminUi\Tab\Event\TabEvents;
use EzSystems\EzPlatformAdminUi\Tab\Event\TabGroupEvent;
use EzSystems\EzPlatformAdminUi\Tab\SystemInfo\TabFactory;
use EzSystems\EzPlatformAdminUi\Tab\TabRegistry;
use EzSystems\EzSupportToolsBundle\SystemInfo\SystemInfoCollectorRegistry;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SystemInfoTabGroupListener implements EventSubscriberInterface
{
    /** @var TabRegistry */
    protected $tabRegistry;

    /** @var TabFactory */
    protected $tabFactory;

    /** @var SystemInfoCollectorRegistry */
    protected $systeminfoCollectorRegistry;

    /**
     * @param TabRegistry $tabRegistry
     * @param TabFactory $tabFactory
     * @param SystemInfoCollectorRegistry $systeminfoCollectorRegistry
     */
    public function __construct(
        TabRegistry $tabRegistry,
        TabFactory $tabFactory,
        SystemInfoCollectorRegistry $systeminfoCollectorRegistry
    )
    {
        $this->tabRegistry = $tabRegistry;
        $this->tabFactory = $tabFactory;
        $this->systeminfoCollectorRegistry = $systeminfoCollectorRegistry;
    }

    public static function getSubscribedEvents()
    {
        return [
            TabEvents::TAB_GROUP_PRE_RENDER => ['onTabGroupPreRender', 10],
        ];
    }

    /**
     * @param TabGroupEvent $event
     */
    public function onTabGroupPreRender(TabGroupEvent $event)
    {
        $tabGroup = $event->getData();

        if ($tabGroup->getIdentifier() !== 'systeminfo') {
            return;
        }

        foreach ($this->systeminfoCollectorRegistry->getIdentifiers() as $collectorIdentifier) {
            $this->tabRegistry->addTab(
                $this->tabFactory->createTab($collectorIdentifier),
                'systeminfo'
            );
        }
    }
}
