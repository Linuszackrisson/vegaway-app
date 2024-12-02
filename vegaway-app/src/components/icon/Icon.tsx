// src/components/Icon/Icon.tsx
import React from 'react';
import { icons } from 'lucide-react';

interface IconProps {
	name: keyof typeof icons;
	className?: string;
	color?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, color = 'currentColor', ...props }) => {
	const LucideIcon = icons[name];

	if (!LucideIcon) {
		console.warn(`Icon "${name}" does not exist in lucide-react`);
		return null;
	}

	return <LucideIcon className={className} color={color} {...props} />;
};

export default Icon;

/*
 * Author: Jacob
 *  Global Icon-komponent för alla ikoner (Lucide).
 * importeras såhär om det är ikon i knapp: <Icon name="LucideIconName" className="button__icon" />
 * Såhär om det är fristående ikon: <Icon name="LucideIconName" className="icon" />
 */
