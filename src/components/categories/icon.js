import React from 'react';
import {
  Local,
  Globe,
  Manual,
  Currency,
  PersonalComputer,
  Navigate,
  Cafeteria,
  Yoga,
  Car,
  Aid,
  Multimedia,
  Bar
} from 'grommet-icons';

const icons = {
  country: Local,
  world: Globe,
  politics: Manual,
  economy: Currency,
  science: PersonalComputer,
  travel: Navigate,
  sports: Yoga,
  food: Cafeteria,
  auto: Car,
  entertainment: Bar,
  health: Aid,
  culture: Multimedia
};

const CategoryIcon = ({name, ...rest}) => {
  const Icon = icons[name];
  return <Icon {...rest} />;
};

export default CategoryIcon;
