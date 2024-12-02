// src/components/icon/Icon.tsx
import * as Icons from 'lucide-react';

interface IconProps {
	name: keyof typeof Icons;
	className?: string;
	color?: string;
	size?: number | string;
	strokeWidth?: number;
}

const Icon: React.FC<IconProps> = ({ name, className, color = 'currentColor', size, strokeWidth, ...props }) => {
	const LucideIcon = Icons[name] as React.ElementType;

	if (!LucideIcon) {
		console.warn(`Icon "${name}" does not exist in lucide-react`);
		return null;
	}

	return <LucideIcon className={className} color={color} size={size} strokeWidth={strokeWidth} {...props} />;
};

export default Icon;

/*
 * Author: Jacob
 *  Global Icon-komponent för alla ikoner (Lucide).
 * importeras såhär om det är ikon i knapp: <Icon name="LucideIconName" className="button__icon" />
 * Såhär om det är fristående ikon: <Icon name="LucideIconName" className="icon" />
 */
