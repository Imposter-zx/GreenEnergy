import React from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import StatCard from '../common/StatCard';
import Input from '../common/Input';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import LoadingSpinner from '../common/LoadingSpinner';
import { Container, Section, Grid, Flex } from '../layout/LayoutUtils';
import { Zap, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const ComponentShowcase: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen py-12">
            <Container>
                {/* Header */}
                <Section>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">UI Component Library</h1>
                    <p className="text-lg text-slate-600">A comprehensive set of reusable components for GreenEnergy</p>
                </Section>

                {/* Buttons */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Buttons</h2>
                    <Card>
                        <Grid columns={4} gap="md">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="danger">Danger</Button>
                        </Grid>
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-4">Sizes</h3>
                            <Flex gap="md">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </Flex>
                        </div>
                    </Card>
                </Section>

                {/* Cards */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Cards</h2>
                    <Grid columns={3} gap="md">
                        <Card variant="default">
                            <h3 className="font-bold text-slate-800 mb-2">Default Card</h3>
                            <p className="text-slate-600 text-sm">Standard card with subtle border and shadow</p>
                        </Card>
                        <Card variant="elevated">
                            <h3 className="font-bold text-slate-800 mb-2">Elevated Card</h3>
                            <p className="text-slate-600 text-sm">More prominent shadow for emphasis</p>
                        </Card>
                        <Card variant="flat" hoverable>
                            <h3 className="font-bold text-slate-800 mb-2">Flat Hoverable</h3>
                            <p className="text-slate-600 text-sm">Minimal style with hover effect</p>
                        </Card>
                    </Grid>
                </Section>

                {/* Stat Cards */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Stat Cards</h2>
                    <Grid columns={3} gap="md">
                        <StatCard
                            icon={<Zap size={24} />}
                            label="Total Consumption"
                            value="1,234"
                            unit="kWh"
                            trend="down"
                            trendValue={12}
                            trendLabel="compared to last month"
                            color="primary"
                        />
                        <StatCard
                            icon={<TrendingUp size={24} />}
                            label="Cost Saved"
                            value="$156"
                            trend="up"
                            trendValue={8}
                            color="success"
                        />
                        <StatCard
                            icon={<AlertTriangle size={24} />}
                            label="Alerts"
                            value="3"
                            color="warning"
                        />
                    </Grid>
                </Section>

                {/* Badges */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Badges</h2>
                    <Card>
                        <Flex gap="md" wrap="wrap">
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="danger">Danger</Badge>
                            <Badge variant="info">Info</Badge>
                            <Badge icon={<CheckCircle size={14} />}>With Icon</Badge>
                        </Flex>
                    </Card>
                </Section>

                {/* Inputs */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Input Fields</h2>
                    <Card>
                        <Grid columns={2} gap="md">
                            <Input
                                label="Standard Input"
                                placeholder="Enter text here..."
                            />
                            <Input
                                label="Input with Error"
                                placeholder="Invalid value"
                                error="This field contains an error"
                            />
                            <Input
                                label="Input with Helper"
                                placeholder="Enter email"
                                helperText="We'll never share your email"
                            />
                            <Input
                                label="Filled Variant"
                                variant="filled"
                                placeholder="Filled input"
                            />
                        </Grid>
                    </Card>
                </Section>

                {/* Alerts */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Alerts</h2>
                    <div className="space-y-4">
                        <Alert
                            variant="success"
                            title="Success!"
                            message="Your changes have been saved successfully."
                        />
                        <Alert
                            variant="error"
                            title="Error"
                            message="Something went wrong. Please try again later."
                        />
                        <Alert
                            variant="warning"
                            title="Warning"
                            message="Your energy consumption is above average this week."
                        />
                        <Alert
                            variant="info"
                            title="Information"
                            message="A new feature has been added to your dashboard."
                        />
                    </div>
                </Section>

                {/* Loading Spinner */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Loading States</h2>
                    <Card>
                        <Grid columns={3} gap="md">
                            <Flex direction="col" align="center" gap="md">
                                <LoadingSpinner size="sm" />
                                <span className="text-sm text-slate-600">Small</span>
                            </Flex>
                            <Flex direction="col" align="center" gap="md">
                                <LoadingSpinner size="md" />
                                <span className="text-sm text-slate-600">Medium</span>
                            </Flex>
                            <Flex direction="col" align="center" gap="md">
                                <LoadingSpinner size="lg" label="Loading..." />
                                <span className="text-sm text-slate-600">Large</span>
                            </Flex>
                        </Grid>
                    </Card>
                </Section>

                {/* Modal */}
                <Section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Modal</h2>
                    <Card>
                        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                    </Card>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Sample Modal"
                        size="md"
                    >
                        <p className="text-slate-600 mb-4">
                            This is a sample modal component. It can contain any content you want.
                        </p>
                        <Flex gap="md" justify="end">
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                                Confirm
                            </Button>
                        </Flex>
                    </Modal>
                </Section>

                {/* Footer */}
                <Section spacing="lg">
                    <Card variant="flat">
                        <div className="text-center">
                            <h3 className="font-bold text-slate-800 mb-2">Component Library Complete</h3>
                            <p className="text-slate-600">
                                These components are ready to use throughout the application.
                            </p>
                        </div>
                    </Card>
                </Section>
            </Container>
        </div>
    );
};

export default ComponentShowcase;
