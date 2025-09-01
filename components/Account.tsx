'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Package, 
  Pill, 
  Settings, 
  LogOut, 
  Eye, 
  EyeOff,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Bell,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth, User as UserType } from '@/contexts/AuthContext';

interface AccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Account({ isOpen, onClose }: AccountProps) {
  const { state, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>(state.user || {});

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  const handleSaveProfile = () => {
    updateProfile(formData);
    setEditMode(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-6 h-6 mr-2" />
            My Account
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 p-4">
            <div className="space-y-2">
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('profile')}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button
                variant={activeTab === 'orders' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('orders')}
              >
                <Package className="w-4 h-4 mr-2" />
                Order History
              </Button>
              <Button
                variant={activeTab === 'prescriptions' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('prescriptions')}
              >
                <Pill className="w-4 h-4 mr-2" />
                Prescriptions
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Separator className="my-4" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <Button
                    variant={editMode ? 'default' : 'outline'}
                    onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                  >
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={editMode ? formData.firstName || '' : state.user.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={editMode ? formData.lastName || '' : state.user.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editMode ? formData.email || '' : state.user.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={editMode ? formData.phone || '' : state.user.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={editMode ? formData.dateOfBirth || '' : state.user.dateOfBirth}
                          onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                          disabled={!editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Address Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={editMode ? formData.address?.street : state.user.address.street}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            address: { 
                              street: e.target.value,
                              city: prev.address?.city || '',
                              state: prev.address?.state || '',
                              zipCode: prev.address?.zipCode || ''
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={editMode ? formData.address?.city : state.user.address.city}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              address: { 
                                street: prev.address?.street || '',
                                city: e.target.value,
                                state: prev.address?.state || '',
                                zipCode: prev.address?.zipCode || ''
                              }
                            }))}
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={editMode ? formData.address?.state : state.user.address.state}
                            onChange={(e) => setFormData(prev => ({ 
                              ...prev, 
                              address: { 
                                street: prev.address?.street || '',
                                city: prev.address?.city || '',
                                state: e.target.value,
                                zipCode: prev.address?.zipCode || ''
                              }
                            }))}
                            disabled={!editMode}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={editMode ? formData.address?.zipCode : state.user.address.zipCode}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            address: { 
                              street: prev.address?.street || '',
                              city: prev.address?.city || '',
                              state: prev.address?.state || '',
                              zipCode: e.target.value
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Insurance Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="provider">Insurance Provider</Label>
                        <Input
                          id="provider"
                          value={editMode ? formData.insurance?.provider : state.user.insurance.provider}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            insurance: { 
                              provider: e.target.value,
                              memberId: prev.insurance?.memberId || '',
                              groupNumber: prev.insurance?.groupNumber || ''
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="memberId">Member ID</Label>
                        <Input
                          id="memberId"
                          value={editMode ? formData.insurance?.memberId : state.user.insurance.memberId}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            insurance: { 
                              provider: prev.insurance?.provider || '',
                              memberId: e.target.value,
                              groupNumber: prev.insurance?.groupNumber || ''
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupNumber">Group Number</Label>
                        <Input
                          id="groupNumber"
                          value={editMode ? formData.insurance?.groupNumber : state.user.insurance.groupNumber}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            insurance: { 
                              provider: prev.insurance?.provider || '',
                              memberId: prev.insurance?.memberId || '',
                              groupNumber: e.target.value
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Emergency Contact */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        Emergency Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="emergencyName">Name</Label>
                        <Input
                          id="emergencyName"
                          value={editMode ? formData.emergencyContact?.name : state.user.emergencyContact.name}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            emergencyContact: { 
                              name: e.target.value,
                              phone: prev.emergencyContact?.phone || '',
                              relationship: prev.emergencyContact?.relationship || ''
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={editMode ? formData.emergencyContact?.phone : state.user.emergencyContact.phone}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            emergencyContact: { 
                              name: prev.emergencyContact?.name || '',
                              phone: e.target.value,
                              relationship: prev.emergencyContact?.relationship || ''
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                      <div>
                        <Label htmlFor="relationship">Relationship</Label>
                        <Input
                          id="relationship"
                          value={editMode ? formData.emergencyContact?.relationship : state.user.emergencyContact.relationship}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            emergencyContact: { 
                              name: prev.emergencyContact?.name || '',
                              phone: prev.emergencyContact?.phone || '',
                              relationship: e.target.value
                            }
                          }))}
                          disabled={!editMode}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Order History</h2>
                
                {state.orders.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-500">Your order history will appear here</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {state.orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                              <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1 capitalize">{order.status}</span>
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <span className="font-medium">{item.name}</span>
                                    {item.prescription && (
                                      <Badge variant="outline" className="ml-2 text-xs">Rx</Badge>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                    <span className="ml-4 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                              {order.trackingNumber && (
                                <div className="text-sm text-gray-500">
                                  Tracking: {order.trackingNumber}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              {order.shippingAddress}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Prescriptions</h2>
                  <Button>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Request Refill
                  </Button>
                </div>
                
                {state.prescriptions.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions</h3>
                      <p className="text-gray-500">Your prescriptions will appear here</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {state.prescriptions.map((prescription) => (
                      <Card key={prescription.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{prescription.medicationName}</CardTitle>
                              <p className="text-sm text-gray-500">Prescribed by {prescription.prescribedBy}</p>
                            </div>
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Dosage:</span>
                              <p className="font-medium">{prescription.dosage}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Quantity:</span>
                              <p className="font-medium">{prescription.quantity}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Refills Left:</span>
                              <p className="font-medium">{prescription.refillsRemaining}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Expires:</span>
                              <p className="font-medium">{new Date(prescription.expiryDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 text-sm">Instructions:</span>
                            <p className="text-sm mt-1">{prescription.instructions}</p>
                          </div>
                          {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                            <Button className="w-full" size="sm">
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Request Refill
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Notification Preferences */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive order updates and health reminders</p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={state.user?.preferences?.emailNotifications || false}
                          onCheckedChange={(checked) => updateProfile({
                            preferences: { 
                              emailNotifications: checked,
                              smsNotifications: state.user?.preferences?.smsNotifications || false,
                              autoRefill: state.user?.preferences?.autoRefill || false
                            }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Get text alerts for important updates</p>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={state.user?.preferences?.smsNotifications || false}
                          onCheckedChange={(checked) => updateProfile({
                            preferences: { 
                              emailNotifications: state.user?.preferences?.emailNotifications || false,
                              smsNotifications: checked,
                              autoRefill: state.user?.preferences?.autoRefill || false
                            }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autoRefill">Auto-Refill</Label>
                          <p className="text-sm text-gray-500">Automatically refill prescriptions</p>
                        </div>
                        <Switch
                          id="autoRefill"
                          checked={state.user?.preferences?.autoRefill || false}
                          onCheckedChange={(checked) => updateProfile({
                            preferences: { 
                              emailNotifications: state.user?.preferences?.emailNotifications || false,
                              smsNotifications: state.user?.preferences?.smsNotifications || false,
                              autoRefill: checked
                            }
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Security Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button className="w-full">Update Password</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}