<?php

/**
 * @copyright Copyright (C) eZ Systems AS. All rights reserved.
 * @license For full copyright and license information view LICENSE file distributed with this source code.
 */
namespace EzSystems\EzPlatformAdminUi\UI\Config\Provider\FieldType\RichText;

use eZ\Publish\Core\MVC\ConfigResolverInterface;
use EzSystems\EzPlatformAdminUi\UI\Config\ProviderInterface;

/**
 * Provides information about RichText Custom Tags.
 */
class CustomTag implements ProviderInterface
{
    /** @var ConfigResolverInterface */
    private $configResolver;

    /**
     * @param ConfigResolverInterface $configResolver
     */
    public function __construct(ConfigResolverInterface $configResolver)
    {
        $this->configResolver = $configResolver;
    }

    /**
     * @return array RichText Custom Tags config
     */
    public function getConfig(): array
    {
        if ($this->configResolver->hasParameter('fieldtypes.ezrichtext.custom_tags')) {
            return $this->mapConfig($this->configResolver->getParameter('fieldtypes.ezrichtext.custom_tags'));
        }

        return [];
    }

    /**
     * Map system settings to UI configuration.
     *
     * @param array $customTags
     *
     * @return array Mapped configuration
     */
    private function mapConfig(array $customTags): array
    {
        // @todo inject UI settings
        $config = [];
        foreach ($customTags as $tagName => $settings) {
            foreach ($settings['attributes'] as $attributeName => $properties) {
                $config[$tagName]['attributes'][$attributeName] = [
                    'type' => $properties['type'],
                    'required' => $properties['required'],
                    'defaultValue' => $properties['default_value'],
                ];

                if ('choice' === $properties['type'] && isset($properties['choices'])) {
                    $config[$tagName]['attributes'][$attributeName]['choices'] = $properties['choices'];
                }
            }
        }

        return $config;
    }
}
