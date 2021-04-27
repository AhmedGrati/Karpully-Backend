# data "azurerm_resource_group" "karpully" {
#     name = "karpully"
# }

resource "azurerm_resource_group" "karpully" {
  name     = "karpully"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "karpully" {
  name                  = "karpully"
  location              = azurerm_resource_group.karpully.location
  resource_group_name   = azurerm_resource_group.karpully.name
  dns_prefix            = "karpully"            
  kubernetes_version    =  var.kubernetes_version
  
  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_E4s_v3"
    type       = "VirtualMachineScaleSets"
    os_disk_size_gb = 250
  }

  service_principal  {
    client_id = var.serviceprinciple_id
    client_secret = var.serviceprinciple_key
  }

  linux_profile {
    admin_username = "karpullyadmin"
    ssh_key {
        key_data = var.ssh_key
    }
  }

  network_profile {
      network_plugin = "kubenet"
      load_balancer_sku = "Standard"
  }

  addon_profile {
    aci_connector_linux {
      enabled = false
    }

    azure_policy {
      enabled = false
    }

    http_application_routing {
      enabled = false
    }

    kube_dashboard {
      enabled = false
    }

    oms_agent {
      enabled = false
    }
  }

}